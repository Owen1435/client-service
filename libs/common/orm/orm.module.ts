import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('TYPEORM_HOST'),
    port: parseInt(configService.get('DATABASE_PORT'), 10),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: [configService.get('TYPEORM_ENTITIES')],
    synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
  }),
};

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
  exports: [TypeOrmModule],
})
export class OrmModule {}
