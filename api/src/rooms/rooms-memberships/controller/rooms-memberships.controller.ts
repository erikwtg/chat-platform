import { Controller, Post, Delete, Body, UseGuards } from "@nestjs/common";
import { RoomsMembershipsService } from "../service/rooms-memberships.service";
import { JoinRoomDto } from "../dto/join-memberships.dto";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";

@Controller('rooms-memberships')
export class RoomsMembershipsController {
  constructor(private readonly roomsMembershipsService: RoomsMembershipsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("join")
  async joinRoom(@Body() dto: JoinRoomDto) {
    return this.roomsMembershipsService.joinRoom(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("leave")
  async leaveRoom(@Body() dto: JoinRoomDto) {
    return this.roomsMembershipsService.leaveRoom(dto.userId, dto.roomId);
  }
}
