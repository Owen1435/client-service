import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from '../libs/common/config/configuration';
import { RmqModule } from '../libs/common/rmq/rmq.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeOrmConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    RmqModule,
    AuthModule,
    ClientModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
