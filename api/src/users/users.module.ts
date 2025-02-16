import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
  providers: [
    UsersService,
    UsersRepository
  ]
})
export class UsersModule {}
