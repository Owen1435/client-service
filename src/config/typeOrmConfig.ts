import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ClientEntity } from '../entity/client.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('TYPEORM_HOST'),
      port: parseInt(configService.get('TYPEORM_PORT'), 10),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      // entities: [configService.get('TYPEORM_ENTITIES')],
      entities: [ClientEntity],
      synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
