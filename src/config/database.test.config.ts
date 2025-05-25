import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmTestConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: true,
  logging: false,
};
