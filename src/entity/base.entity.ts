import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
}
