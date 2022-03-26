import { Client } from './client';
import { Position } from './position';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    description: 'Order created date',
    example: '2022-03-24 12:42:20',
  })
  date: Date;

  @ApiProperty({
    description: 'Order status',
    example: 'default',
  })
  status: string;

  @ApiProperty({
    description: 'Order total price',
    example: 1560,
  })
  price: number;

  @ApiProperty({
    description: 'Order total discount',
    example: 5,
  })
  discount: number;

  @ApiProperty({
    description: 'Client',
    type: Client,
  })
  client: Client;

  @ApiProperty({
    description: 'Order positions',
    type: [Position],
  })
  positions: Position[];
}
