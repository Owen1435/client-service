import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { DiscountRepository } from '../discount/discount.repository';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { rmqErrorResponse } from '../../../libs/common/rmq/rmq-error.response';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { ClientEntity } from '../../entity/client.entity';

@Injectable()
export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
    private discountRepository: DiscountRepository,
  ) {}

  async incrementOrderCount(clientId: number) {
    const client = await this.clientRepository.findOne(clientId);
    client.orderCount++;
    await this.clientRepository.save(client);

    console.log('Increment order count for client id:', client.id);
  }

  async getClientDiscount(clientId: number): Promise<RmqResponse<number>> {
    try {
      const client = await this.clientRepository.findOne(clientId);
      if (!client) {
        throw new HttpException('Client was not found', HttpStatus.BAD_REQUEST);
      }

      const discount = await this.discountRepository.findOne({
        where: {
          fromCount: LessThanOrEqual(client.orderCount),
          toCount: MoreThanOrEqual(client.orderCount),
        },
      });

      const discountRate = discount ? discount.rate : 0;
      return new RmqResponse<number>(discountRate, HttpStatus.OK);
    } catch (error) {
      return rmqErrorResponse(error);
    }
  }

  async getByLogin(login: string): Promise<ClientEntity> {
    return await this.clientRepository.findOne({
      where: {
        login,
      },
      relations: ['roles'],
    });
  }

  async register(client: ClientEntity): Promise<ClientEntity> {
    return await this.clientRepository.save(client);
  }
}
