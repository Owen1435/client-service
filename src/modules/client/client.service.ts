import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async incrementOrderCount(clientId: number) {
    const client = await this.clientRepository.findOne(clientId);
    client.orderCount++;
    await this.clientRepository.save(client);

    console.log('Increment order count for client id:', client.id);
  }
}
