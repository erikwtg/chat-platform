import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  sendEvent(pattern: string, data: any) {
    console.log(`📡 Enviando evento: ${pattern}`, data);
    return this.client.emit(pattern, data);
  }
}