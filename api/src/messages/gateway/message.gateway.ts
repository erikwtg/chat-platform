import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomsMembershipsService } from "../../rooms/rooms-memberships/service/rooms-memberships.service";

@WebSocketGateway({ namespace: "/message", cors: true })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsMembershipsService: RoomsMembershipsService) {}

  @SubscribeMessage("send_message")
  async handleMessage(socket: Socket, { userId, roomId, content }: { userId: number; roomId: number; content: string }) {
    const user = await this.roomsMembershipsService.getRoomMembership(userId, roomId);
    if (!user) {
      socket.emit("error", { message: "Você não pode enviar mensagens nesta sala!" });
      return;
    }

    this.server.to(`room-${roomId}`).emit("new_message", content);

    this.server.to(`room-${roomId}`).emit("message_received", { roomId, content });
  }
}