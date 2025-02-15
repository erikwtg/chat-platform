import { Injectable } from '@nestjs/common';
import { RoomMembershipsRepository } from "../repository/rooms-memberships.repository";
import { JoinRoomDto } from "../dto/join-memberships.dto";

@Injectable()
export class RoomsMembershipsService {
  constructor(private readonly roomsMembershipsRepository: RoomMembershipsRepository) {}

  async joinRoom(dto: JoinRoomDto) {
    // Aqui podemos adicionar validações, ex: se a sala existe, se o usuário já está na sala, etc.
    return this.roomsMembershipsRepository.addUserToRoom(dto.userId, dto.roomId);
  }

  async leaveRoom(userId: number, roomId: number) {
    return this.roomsMembershipsRepository.removeUserFromRoom(userId, roomId);
  }
}
