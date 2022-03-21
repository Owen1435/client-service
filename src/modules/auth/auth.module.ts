import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ClientRepository } from '../client/client.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../entity/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ClientRepository]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
