import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ClientEntity } from './client.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  role: string;

  @ManyToMany(() => ClientEntity, (client) => client.roles)
  clients: ClientEntity[];
}
