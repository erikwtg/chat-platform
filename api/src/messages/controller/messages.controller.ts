import { Controller, Post, Patch, Delete, Get, Param, Body, UseGuards, Query, Req } from "@nestjs/common";
import { User } from "../../common/decorators/user.decorator";
import { MessagesService } from "../service/messages.service";
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Request } from 'express';

@Controller("messages")
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const userId = req.user.id;
    return this.messagesService.sendMessage(dto, userId);
  }

  @Patch(":id")
  async updateMessage(@Param("id") id: number, @Body() dto: UpdateMessageDto, @User() user) {
    return this.messagesService.updateMessage(id, dto, user.id);
  }

  @Delete(":id")
  async deleteMessage(@Param("id") id: number, @User() user) {
    return this.messagesService.deleteMessage(id, user.id);
  }

  @Get(":roomId")
  async getMessagesByRoom(@Param("roomId") roomId: number, @Query("limit") limit?: number) {
    return this.messagesService.getMessagesByRoom(roomId, limit);
  }
}