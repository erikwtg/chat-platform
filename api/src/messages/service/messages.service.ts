import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { MessagesRepository } from "../repository/messages.repository";
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async sendMessage(dto: CreateMessageDto, userId: number) {
    return this.messagesRepository.createMessage({ ...dto, userId });
  }

  async updateMessage(messageId: number, dto: UpdateMessageDto, userId: number) {
    const message = await this.messagesRepository.getMessageById(messageId);
    if (message.userId !== userId) throw new ForbiddenException("Você só pode editar suas próprias mensagens");

    const messageDto = {
      content: dto.content,
      isEdited: true,
      // editHistory: ""
    }

    return this.messagesRepository.updateMessage(messageId, messageDto);
  }

  async deleteMessage(messageId: number, userId: number) {
    const message = await this.messagesRepository.getMessageById(messageId);
    if (message.userId !== userId) throw new ForbiddenException("Você só pode deletar suas próprias mensagens");

    return this.messagesRepository.deleteMessage(messageId);
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
