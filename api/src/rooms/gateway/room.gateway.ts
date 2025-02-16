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
    host: '0.0.0.0',
    // port: 3100,
    // credentials: true
  }
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private activeUsers = new Map<string, string>(); // Map<socketId, username>

  constructor(
    private readonly roomsMembershipsService: RoomsMembershipsService,
    private readonly rabbitmqService: RabbitMQService
  ) {
    console.log("✅ WebSocket RoomGateway iniciado!!!")
  }

  async handleConnection(socket: Socket) {
    console.log(`🔵 Cliente conectado: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    try {
      const username = this.activeUsers.get(socket.id);
      if (username) {
        // Notificar todas as salas que o usuário estava
        this.server.emit("userDisconnected", { username });
        this.activeUsers.delete(socket.id);
        console.log(`🔴 Cliente desconectado: ${username} (${socket.id})`);
      }
    } catch (error) {
      console.error(`❌ Erro na desconexão: ${error.message}`);
    }
  }

  @SubscribeMessage("join_room")
  async handleJoinRoom(socket: Socket, @Payload() data: RoomEvent) {
    try {
      const user = await this.roomsMembershipsService.getRoomMembership(data.userId, data.roomId);
      if (!user || 'message' in user) {
        throw new Error("Você não faz parte desta sala!");
      }

      await socket.join(`room-${data.roomId}`);
      this.activeUsers.set(socket.id, user.username);

      // this.server.to(`room-${data.roomId}`).emit("userJoined", { username: user.username });
      
      this.rabbitmqService.sendEvent('room_joined', { roomId: data.roomId, username: user.username });
      console.log(`✅ Usuário ${user.username} entrou na sala ${data.roomId}`);
    } catch (error) {
      console.error(`❌ Erro ao entrar na sala: ${error.message}`);
      socket.emit("error", { message: error.message });
    }
  }

  @SubscribeMessage("leave_room")
  async handleLeaveRoom(socket: Socket, { userId, roomId }: { userId: number; roomId: number }) {
    socket.leave(`room-${roomId}`);
    const username = this.activeUsers.get(socket.id);
    if (username) {
      // this.server.to(`room-${roomId}`).emit("userLeft", { username });
      this.rabbitmqService.sendEvent('leave_room', { username });
      this.activeUsers.delete(socket.id);
    }

    console.log(`🔴 Usuário ${username} saiu da sala ${roomId}`);
  }
}