import { Car } from './car';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { ProductTypeEnum } from '../enum/product-type.enum';
import { ProductStatusEnum } from '../enum/product-status.enum';

export class Product {
  @ApiProperty({
    description: 'Product id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Product title',
    example: 'BMW e46',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Product price',
    example: '5000',
  })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Product type',
    example: 'car',
  })
  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @ApiProperty({
    description: 'Product status',
    example: 'default',
  })
  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum;

  @ApiProperty({
    description: 'Product category',
    example: 'default car',
  })
  category: string;

  @ApiProperty({
    description: 'Product description',
    example: '{"color": "black"}',
  })
  description?: ProductDescription;
}

export type ProductDescription = Car | null;
