import { Module } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../entity/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, ClientRepository])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}