import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'clients' })
export class ClientEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  login: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  pass: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  mail: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  registerDate: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  middleName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  birthDate: Date;
}
