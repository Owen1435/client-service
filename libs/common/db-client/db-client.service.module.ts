import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbClientService } from './db-client.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DbClientService],
  exports: [DbClientService],
})
export class DbClientServiceModule {}
