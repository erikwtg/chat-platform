import { Module } from '@nestjs/common';
import { RoomsService } from './service/rooms.service';
import { RoomsRepository } from './repository/rooms.repository';
import { RoomsController } from './controller/rooms.controller';

import { RoomsMembershipsModule } from './rooms-memberships/rooms-memberships.module';
import { RoomMembershipsRepository  } from './rooms-memberships/repository/rooms-memberships.repository';
import { RoomsMembershipsService } from './rooms-memberships/service/rooms-memberships.service';

@Module({
  imports: [RoomsMembershipsModule],
  providers: [RoomsService, RoomsRepository, RoomsMembershipsService, RoomMembershipsRepository],
  controllers: [RoomsController],
  exports: [RoomsService]
})
export class RoomsModule {}
