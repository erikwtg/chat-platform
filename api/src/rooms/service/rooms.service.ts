import { Injectable } from '@nestjs/common';
import { RoomsRepository } from "../repository/rooms.repository";
import { CreateRoomDto } from "../dto/create-room.dto";
import { UpdateRoomDto } from "../dto/update-room.dto";

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async findAll() {
    return this.roomsRepository.findAll();
  }

  async findById(id: number) {
    return this.roomsRepository.findById(id);
  }

  async createRoom(dto: CreateRoomDto) {
    return this.roomsRepository.createRoom(dto);
  }

  async updateRoom(id: number, dto: UpdateRoomDto) {
    return this.roomsRepository.updateRoom(id, dto.name);
  }

  async deleteRoom(id: number) {
    return this.roomsRepository.deleteRoom(id);
  }

  async getRoomById(roomId: number) {
    return this.roomsRepository.getRoomById(roomId);
  }
}
