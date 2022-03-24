import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'discounts' })
export class DiscountEntity extends BaseEntity {
  @Column({
    type: 'numeric',
  })
  rate: number;

  @Column({
    type: 'int',
  })
  fromCount: number;

  @Column({
    type: 'int',
  })
  toCount: number;
}
