import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CustomIoAdapter } from './socker-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new CustomIoAdapter(app));

  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://rabbitmq:5672"],
      queue: "global_events",
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
