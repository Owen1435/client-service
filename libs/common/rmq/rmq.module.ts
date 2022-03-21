import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const rmqConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    exchanges: [],
    uri: configService.get('RMQ_URI'),
    enableControllerDiscovery: true,
  }),
};

@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, rmqConfig)],
  exports: [RabbitMQModule],
})
export class RmqModule {}
