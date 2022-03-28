import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfigAsync = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('EXPIRES_IN'),
    },
  }),
};
