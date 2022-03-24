import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RmqModule } from '../libs/common/rmq/rmq.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { OrmModule } from '../libs/common/orm/orm.module';
import { DiscountModule } from './modules/discount/discount.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmModule,
    RmqModule,
    AuthModule,
    ClientModule,
    DiscountModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
