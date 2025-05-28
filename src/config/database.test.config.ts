import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderTransactionEntity } from '../orders/infraestructure/database/entities/order-transactions';
import { OrdersEntity } from '../orders/infraestructure/database/entities/orders.entity';
import { OrderItemEntity } from '../orders/infraestructure/database/entities/order-items.entity';
import { UserEntity } from '../users/infrastructure/database/entities/user.entity';
import { AddressEntity } from '../users/infrastructure/database/entities/address.entity';

export const typeOrmTestConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [
    OrdersEntity,
    OrderItemEntity,
    OrderTransactionEntity,
    UserEntity,
    AddressEntity,
  ],
  synchronize: true,
  logging: false,
};
