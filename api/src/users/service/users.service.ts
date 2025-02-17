import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UsersRepository } from "../users.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      return {
        error: true,
        message: "Usuário já existe",
      }
    }

    const user = await this.usersRepository.createUser(dto.username, dto.email, hashedPassword);
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const updateDataDto: Partial<{ username: string; email: string; password: string }> = {};

    if (dto.username) {
      updateDataDto.username = dto.username;
    }
    if (dto.email) {
      updateDataDto.email = dto.email;
    }
    if (dto.password) {
      updateDataDto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.usersRepository.updateUser(id, updateDataDto);
  }
}
