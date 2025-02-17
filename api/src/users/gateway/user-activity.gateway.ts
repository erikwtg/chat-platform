import { Injectable } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@Injectable()
@WebSocketGateway({ namespace: "/user-activity", cors: true })
export class UserActivityGateway {
  @WebSocketServer()
  server: Server;

  constructor() {
    console.log('🚀 UserActivity Gateway iniciado!');
  }

  @SubscribeMessage("typing")
  handleTyping({ roomId, username }: { roomId: number; username: string }) {
    this.server.to(`room-${roomId}`).emit("userTyping", { username });
  }

  @SubscribeMessage("stop_typing")
  handleStopTyping({ roomId, username }: { roomId: number; username: string }) {
    this.server.to(`room-${roomId}`).emit("userStoppedTyping", { username });
  }
}