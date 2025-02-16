import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RoomMembershipsRepository } from "../repository/rooms-memberships.repository";
import { RoomsRepository } from 'src/rooms/repository/rooms.repository';
import { JoinRoomDto } from "../dto/join-memberships.dto";

@Injectable()
export class RoomsMembershipsService {
  constructor(
    private readonly roomsMembershipsRepository: RoomMembershipsRepository,
    private readonly roomsRepository: RoomsRepository
  ) {}

  async joinRoom(dto: JoinRoomDto) {
    const room = await this.roomsRepository.getRoomById(dto.roomId);
    if (!room) {
      throw new NotFoundException("Sala não encontrada");
    }

    const existingMembership = await this.roomsMembershipsRepository.getRoomMembership(dto.roomId, dto.userId);
    if (existingMembership) {
      throw new BadRequestException("Usuário já está na sala");
    }

    return this.roomsMembershipsRepository.addUserToRoom(dto.userId, dto.roomId, "member");
  }

  async leaveRoom(userId: number, roomId: number) {
    return this.roomsMembershipsRepository.removeUserFromRoom(userId, roomId);
  }

  async getRoomMembership(roomId: number, userId: number) {
    const members = this.roomsMembershipsRepository.getRoomMembership(roomId, userId);
    
    if (!members) {
      return { message: "Nenhum membro encontrado nesta sala" };
    }

    return members;
  }
}
