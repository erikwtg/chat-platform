import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { MessagesRepository } from "../repository/messages.repository";
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
import { RoomMembershipsRepository } from "src/rooms/rooms-memberships/repository/rooms-memberships.repository";

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly roomsMembershipRepository: RoomMembershipsRepository
  ) {}

  async sendMessage(dto: CreateMessageDto, userId: number) {
    try {
      const membership = await this.roomsMembershipRepository.getRoomMembership(dto.roomId, userId);
      if (!membership || 'message' in membership) {
        throw new ForbiddenException("Você não é membro desta sala");
      }

      const message = await this.messagesRepository.createMessage({ ...dto, userId });
      return message;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }

  async updateMessage(messageId: number, dto: UpdateMessageDto, userId: number) {
    const message = await this.messagesRepository.getMessageById(messageId);
    if (message.userId !== userId) throw new ForbiddenException("Você só pode editar suas próprias mensagens");

    const messageDto = {
      content: dto.content,
      isEdited: true,
      // editHistory: ""
    }

    const updateMessage = this.messagesRepository.updateMessage(messageId, messageDto);
    return updateMessage;
  }

  async deleteMessage(messageId: number, userId: number) {
    const message = await this.messagesRepository.getMessageById(messageId);

    if (message.userId !== userId) throw new ForbiddenException("Você só pode deletar suas próprias mensagens");

    const deleteMessage = await this.messagesRepository.deleteMessage(messageId);
    return deleteMessage;
  }

  async getMessageById(messageId: number) {
    const message = await this.messagesRepository.getMessageById(messageId);

    if (!message) throw new NotFoundException("Mensagem não encontrada.");
    return message;
  }

  async getMessagesByRoom(roomId: number, limit?: number) {
    return this.messagesRepository.getMessagesByRoom(roomId, limit);
  }
}
