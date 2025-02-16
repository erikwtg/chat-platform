import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { RabbitMQService } from "../../rabbitmq/rabbitmq.service";
import { RoomsMembershipsService } from "../rooms-memberships/service/rooms-memberships.service";

interface RoomEvent {
  userId: number;
  roomId: number;
}

@Injectable()
@WebSocketGateway({
  namespace: "/room",
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ['GET', 'POST']
  }
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private activeUsers = new Map<string, string>(); // Map<socketId, username>
  
  constructor(
    private readonly roomsMembershipsService: RoomsMembershipsService,
    private readonly rabbitmqService: RabbitMQService
  ) {
    console.log("✅ WebSocket RoomGateway iniciado!!!")
  }
  
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    console.log(`🔵 Cliente conectado: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    try {
      const username = this.activeUsers.get(socket.id);

      if (username) {
        this.server.emit("userDisconnected", { username });

        this.activeUsers.delete(socket.id);

        console.log(`🔴 Cliente desconectado: ${username} (${socket.id})`);
      }
    } catch (error) {
      console.error(`❌ Erro na desconexão: ${error.message}`);
    }
  }

  @SubscribeMessage("join_room")
  async handleJoinRoom(
    client: Socket,
    payload: string | { userId: number; roomId: number }
  ) {
    try {
      console.log("Dados recebidos brutos:", { socketId: client.id, payload });

      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      const { userId, roomId } = data;

      console.log("Dados parseados:", { userId, roomId });

      if (!userId || !roomId) {
        throw new Error("Dados inválidos: userId e roomId são obrigatórios");
      }

      const user = await this.roomsMembershipsService.getRoomMembership(
        Number(roomId), 
        Number(userId)
      );

      if (!user || 'message' in user) {
        throw new Error("Você não faz parte desta sala!");
      }

      await client.join(`room-${roomId}`);

      this.activeUsers.set(client.id, user.username);

      this.server.to(`room-${roomId}`).emit("user_join", { username: user.username });

      this.rabbitmqService.sendEvent('room_joined', { 
        roomId, 
        username: user.username 
      });

      console.log(`✅ Usuário ${user.username} entrou na sala ${roomId}`);
    } catch (error) {
      console.error(`❌ Erro ao entrar na sala:`, error);
      client.emit("error", { message: error.message });
    }
  }

  @SubscribeMessage("leave_room")
  async handleLeaveRoom(socket: Socket, { userId, roomId }: { userId: number; roomId: number }) {
    try {
      socket.leave(`room-${roomId}`);

      const username = this.activeUsers.get(socket.id);

      if (username) {
        this.server.to(`room-${roomId}`).emit("user_leave", { username });

        this.rabbitmqService.sendEvent('leave_room', { username });

        this.activeUsers.delete(socket.id);
      }
  
      console.log(`🔴 Usuário ${username} saiu da sala ${roomId}`);
    } catch(error) {
      console.error(`❌ Erro ao entrar na sala:`, error);
    }
  }
}