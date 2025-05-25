import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const host = String(configService.get('DB_HOST'));
    const port = parseInt(String(configService.get('DB_PORT')));
    const username = String(configService.get('DB_USERNAME'));
    const password = String(configService.get('DB_PASSWORD'));
    const database = String(configService.get('DB_DATABASE'));

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
      autoLoadEntities: true,
    };
  },
};
