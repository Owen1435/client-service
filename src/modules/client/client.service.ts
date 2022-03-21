import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private client: ClientRepository) {}
}
