import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

const EXCHANGES = [];

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [...EXCHANGES],
      uri: 'amqp://localhost:5672',
      enableControllerDiscovery: true,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RmqModule {}
