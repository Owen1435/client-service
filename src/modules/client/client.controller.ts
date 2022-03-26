import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  //todo плохое решение (тест)
  @RabbitSubscribe({
    exchange: 'order.created.exchange',
    routingKey: '',
    queue: 'order.created.queue.client-service',
  })
  incrementOrderCount(clientId: number) {
    this.clientService.incrementOrderCount(clientId);
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'client.get.discount.route',
    queue: 'client.get.discount.queue',
  })
  getClientDiscount(clientId: number): Promise<RmqResponse<number>> {
    return this.clientService.getClientDiscount(clientId);
  }
}
