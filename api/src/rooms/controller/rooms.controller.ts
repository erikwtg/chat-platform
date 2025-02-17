import { Controller, Get, Post, Patch, Delete, Body, Req, Param, UseGuards } from '@nestjs/common';
import { RoomsService } from "../service/rooms.service";
import { CreateRoomDto } from "../dto/create-room.dto";
import { UpdateRoomDto } from "../dto/update-room.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { RoomOwnerOrAdminGuard } from '../guards/room-owner.guard';
import { Request } from '@nestjs/common';

interface RequestWithUser extends Request {
  user: { id: number }
}

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.roomsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.roomsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }

  @UseGuards(JwtAuthGuard, RoomOwnerOrAdminGuard)
  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateRoomDto) {
    return this.roomsService.updateRoom(id, dto);
  }

  @UseGuards(JwtAuthGuard, RoomOwnerOrAdminGuard)
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.roomsService.deleteRoom(id);
  }
}
