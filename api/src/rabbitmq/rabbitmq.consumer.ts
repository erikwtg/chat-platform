import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class RabbitMQConsumer {
  constructor() {}

  @EventPattern('global_events')
  async handleRoomCreated(@Payload() data: any) {
    console.log('📢 Evento global da aplicação:', data);
  }
}