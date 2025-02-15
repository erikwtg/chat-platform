import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/service/database.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { RoomsController } from './rooms/controller/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';

import { RoomsMembershipsModule } from './rooms/rooms-memberships/rooms-memberships.module';
import { RoomsMembershipsController } from './rooms/rooms-memberships/controller/rooms-memberships.controller';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, RoomsModule, RoomsMembershipsModule, MessagesModule],
  controllers: [AppController, RoomsController, RoomsMembershipsController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
