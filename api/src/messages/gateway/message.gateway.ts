import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RabbitMQService } from "../../rabbitmq/rabbitmq.service";
import { RoomsMembershipsService } from "../../rooms/rooms-memberships/service/rooms-memberships.service";

@WebSocketGateway({ namespace: "/message", cors: { origin: "*", methods: ["GET", "POST", "PUT"] } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsMembershipsService: RoomsMembershipsService,
    private readonly rabbitmqService: RabbitMQService
  ) {}

  @SubscribeMessage("send_message")
  async handleMessage(client: Socket, payload: { userId: number; roomId: number; content: string }) {
    try {
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
      const { userId, roomId, content } = data;

      if (!userId || !roomId || !content) {
        throw new Error("Dados inválidos: userId e roomId e content são obrigatórios");
      }

      const user = await this.roomsMembershipsService.getRoomMembership(
        Number(roomId), 
        Number(userId)
      );

      if (!user || 'message' in user) {
        throw new Error("Você não faz parte desta sala!");
      }
  
      this.server.to(`room-${roomId}`).emit("new_message", content);
  
      this.server.to(`room-${roomId}`).emit("message_received", { userId, roomId, content });

      this.rabbitmqService.sendEvent('message_received', { 
        roomId, 
        username: user.username 
      });
    } catch(error) {
      console.error(`❌ Erro ao enviar mensagem na sala:`, error);
      client.emit("error", { message: error.message });
    }
  }
}