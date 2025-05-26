import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/infrastructure/database/entities/product.entity';
import { ProductQueryTypeormAdapter } from './infraestructure/product/typeorm/product-query-typeorm-adapter';
import { CreateOrderUseCaseImpl } from './application/use-cases/create-order.use-case';
import { UserQueryTypeormAdapter } from './infraestructure/user/typeorm/user-query-typeorm-adapter';
import { UserEntity } from 'src/users/infrastructure/database/entities/user.entity';
import { OrdersEntity } from './infraestructure/database/entities/orders.entity';
import { OrderItemEntity } from './infraestructure/database/entities/order-items.entity';
import { OrderTransactionEntity } from './infraestructure/database/entities/order-transactions';
import { OrderRepositoryImpl } from './infraestructure/database/order.repository.impl';
import { OrderController } from './interfaces/order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      OrdersEntity,
      OrderItemEntity,
      OrderTransactionEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: 'ProductQueryService',
      useClass: ProductQueryTypeormAdapter,
    },
    {
      provide: 'UserQueryService',
      useClass: UserQueryTypeormAdapter,
    },
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
    {
      provide: 'CreateOrderUseCase',
      useClass: CreateOrderUseCaseImpl,
    },
  ],
})
export class OrdersModule {}
