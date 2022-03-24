import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  //todo плохое решение, сделал для теста
  @RabbitSubscribe({
    exchange: 'order.created.exchange',
    routingKey: '',
    queue: 'order.created.queue.client-service',
  })
  incrementOrderCount(clientId: number) {
    this.clientService.incrementOrderCount(clientId);
  }
}
