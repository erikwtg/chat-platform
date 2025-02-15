import { Controller, Get, Post, Delete, Body, Param, UseGuards } from "@nestjs/common";
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

  @UseGuards(JwtAuthGuard)
  @Get(":roomId/members/:userId")
  async getRoomMemberhip(@Param("roomId") roomId: string, @Param("userId") userId: string) {
    const members = await this.roomsMembershipsService.getRoomMembership(parseInt(roomId, 10), parseInt(userId, 10));

    if (!members) {
      return { message: "Nenhum membro encontrado nesta sala" };
    }

    return members;
  }
}
