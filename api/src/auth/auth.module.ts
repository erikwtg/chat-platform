import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersService } from 'src/users/service/users.service';
import { UsersRepository } from 'src/users/users.repository';

import { config } from 'dotenv'
config()

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
