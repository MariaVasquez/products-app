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
import { HandleWompiWebhookUseCaseImpl } from './application/use-cases/handle-webhook.use-case';
import { OrderRepositoryImpl } from 'src/orders/infraestructure/database/order.repository.impl';
import { WompiHttpAdapter } from './infrastructure/services/wompi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
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
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
    {
      provide: 'InitiatePaymentUseCase',
      useClass: InitiatePaymentUseCaseImpl,
    },
    {
      provide: 'HandleWompiWebhookUseCase',
      useClass: HandleWompiWebhookUseCaseImpl,
    },
    {
      provide: 'WompiGateway',
      useClass: WompiHttpAdapter,
    },
  ],
})
export class PaymentsModule {}
