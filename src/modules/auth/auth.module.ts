import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ClientRepository } from '../client/client.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../entity/client.entity';
import { jwtConfig } from '../../../libs/common/jwt/jwt.config';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ClientRepository]),
    JwtModule.register(jwtConfig),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
