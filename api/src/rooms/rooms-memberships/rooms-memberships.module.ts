import { Module } from '@nestjs/common';
import { RoomsMembershipsService } from './service/rooms-memberships.service';
import { RoomMembershipsRepository } from './repository/rooms-memberships.repository';
import { RoomsMembershipsController } from './controller/rooms-memberships.controller';

@Module({
  providers: [RoomsMembershipsService, RoomMembershipsRepository],
  controllers: [RoomsMembershipsController],
  exports: [RoomsMembershipsService]
})
export class RoomsMembershipsModule {}