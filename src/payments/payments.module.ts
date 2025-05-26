import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payment.controller';
import { UserEntity } from 'src/users/infrastructure/database/entities/user.entity';
import { OrdersEntity } from 'src/orders/infraestructure/database/entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderQueryTypeormAdapter } from './infrastructure/order/typeorm/order-query-typeorm.adapter';
import { OrderTransactionTypeormAdapter } from './infrastructure/order/typeorm/order-transaction-typeorm.adapter';
import { UserQueryTypeormAdapter } from 'src/orders/infraestructure/user/typeorm/user-query-typeorm-adapter';
import { InitiatePaymentUseCaseImpl } from './application/use-cases/initiate-payment.use-case';
import { OrderTransactionEntity } from 'src/orders/infraestructure/database/entities/order-transactions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrdersEntity,
      OrderTransactionEntity,
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    {
      provide: 'UserQueryService',
      useClass: UserQueryTypeormAdapter,
    },
    {
      provide: 'OrderQueryService',
      useClass: OrderQueryTypeormAdapter,
    },
    {
      provide: 'OrderTransactionRepository',
      useClass: OrderTransactionTypeormAdapter,
    },
    {
      provide: 'InitiatePaymentUseCase',
      useClass: InitiatePaymentUseCaseImpl,
    },
  ],
})
export class PaymentsModule {}
