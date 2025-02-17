import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'rabbitmq_message',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  providers: [
    RabbitMQConsumer,
    RabbitMQService
  ],
  exports: [
    ClientsModule
  ]
})
export class RabbitMQModule {}