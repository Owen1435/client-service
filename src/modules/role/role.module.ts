import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../entity/role.entity';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class RoleModule {}
