import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/service/database.service';
import { CustomIoAdapter } from './socker-io-adapter';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { RoomsController } from './rooms/controller/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';

import { RoomsMembershipsModule } from './rooms/rooms-memberships/rooms-memberships.module';
import { RoomsMembershipsController } from './rooms/rooms-memberships/controller/rooms-memberships.controller';

import { MessagesModule } from './messages/messages.module';

import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

// import { RoomGateway } from './rooms/gateway/room.gateway';

// import { RabbitMQConsumer } from './rabbitmq/rabbitmq.consumer';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    RoomsMembershipsModule,
    MessagesModule,
    RabbitMQModule,
  ],
  controllers: [AppController, RoomsController, RoomsMembershipsController],
  providers: [
    AppService,
    RabbitMQService,
    CustomIoAdapter,
    DatabaseService,
    // RabbitMQConsumer,
    // RoomGateway,
  ],
})
export class AppModule {}
