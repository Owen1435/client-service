import { EntityRepository, Repository } from 'typeorm';
import { ClientEntity } from '../../entity/client.entity';

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {}
