import { Module } from '@nestjs/common';
import { RoomsMembershipsController } from './controller/rooms-memberships.controller';
import { RoomMembershipsRepository } from './repository/rooms-memberships.repository';
import { RoomsMembershipsService } from './service/rooms-memberships.service';
import { RoomsRepository } from '../repository/rooms.repository';

@Module({
  controllers: [RoomsMembershipsController],
  providers: [
    RoomsMembershipsService,
    RoomMembershipsRepository,
    RoomsRepository
  ],
  exports: [RoomsMembershipsService]
})
export class RoomsMembershipsModule {}