import { Module } from '@nestjs/common';
import { MessagesController } from './controller/messages.controller';
import { MessagesService } from './service/messages.service';
import { MessagesRepository } from './repository/messages.repository';
import { RoomMembershipsRepository } from 'src/rooms/rooms-memberships/repository/rooms-memberships.repository';
import { RoomsMembershipsService } from 'src/rooms/rooms-memberships/service/rooms-memberships.service';
import { RoomsRepository } from 'src/rooms/repository/rooms.repository';

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesRepository,
    MessagesService,
    RoomsRepository,
    RoomMembershipsRepository,
    RoomsMembershipsService
  ]
})
export class MessagesModule {}
