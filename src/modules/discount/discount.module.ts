import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from '../../entity/discount.entity';
import { DiscountRepository } from './discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity, DiscountRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DiscountModule {}
