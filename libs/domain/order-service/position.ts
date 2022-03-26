import { Order } from './order';
import { Product } from './product';
import { ApiProperty } from '@nestjs/swagger';

export class Position {
  @ApiProperty({
    description: 'Order',
    type: Order,
  })
  order: Order;

  @ApiProperty({
    description: 'Product',
    type: Product,
  })
  product: Product;

  @ApiProperty({
    description: 'Product count',
    example: 2,
  })
  count: number;
}
