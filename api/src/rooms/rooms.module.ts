import { Module } from '@nestjs/common';
import { RoomsService } from './service/rooms.service';
import { RoomsRepository } from './repository/rooms.repository';
import { RoomsController } from './controller/rooms.controller';
import { RoomsMembershipsModule } from './rooms-memberships/rooms-memberships.module';
import { RoomMembershipsRepository  } from './rooms-memberships/repository/rooms-memberships.repository';
import { RoomsMembershipsService } from './rooms-memberships/service/rooms-memberships.service';

import { RoomGateway } from './gateway/room.gateway';

import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  imports: [
    RoomsMembershipsModule,
  ],
  controllers: [RoomsController],
  providers: [
    RoomGateway,
    RoomsService,
    RoomsRepository,
    RoomsMembershipsService,
    RoomMembershipsRepository,
    RabbitMQService
  ],
  exports: [RoomsService]
})
export class RoomsModule {}
