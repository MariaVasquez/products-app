import { Inject, Injectable } from '@nestjs/common';
import { HandleWompiWebhookUseCase } from './interfaces/handle-webhook.use-case.interface';
import { OrderTransactionRepository } from 'src/payments/domain/order/ports/order-transaction.repository';
import { OrderRepository } from 'src/orders/domain/repositories/order-repository';
import { WompiWebhookDto } from 'src/payments/controllers/dto/webhook/wompi.webhook.dto';
import { ResponseCodes } from 'src/shared/response-code';
import { ApiException } from 'src/shared/exceptions/ApiException';
import {
  OrderStatus,
  TransactionStatus,
} from 'src/shared/enums/order-status.enum';
import { DataSource, EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { OrderTransactionEntity } from 'src/orders/infraestructure/database/entities/order-transactions';
import { OrdersEntity } from 'src/orders/infraestructure/database/entities/orders.entity';
import { ProductRepository } from 'src/products/domain/repositories/product.repository';
import { ProductEntity } from 'src/products/infrastructure/database/entities/product.entity';

@Injectable()
export class HandleWompiWebhookUseCaseImpl
  implements HandleWompiWebhookUseCase
{
  constructor(
    @Inject('OrderTransactionRepository')
    private readonly transactionRepo: OrderTransactionRepository,

    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepository,
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(payload: WompiWebhookDto): Promise<void> {
    console.log('Init webhook', payload);
    if (payload.event !== 'transaction.updated') {
      console.warn('No es evento de transacción');
      return;
    }

    const payloadTx = payload.data.transaction;
    const reference = payloadTx.reference;

    await this.dataSource.transaction(async (manager: EntityManager) => {
      const transaction = await manager.findOne(OrderTransactionEntity, {
        where: { external_id: reference },
        relations: ['order'],
      });

      if (!transaction) {
        throw new ApiException(
          ResponseCodes.TRANSACTION_NOT_FOUND.message,
          ResponseCodes.TRANSACTION_NOT_FOUND.httpStatus,
        );
      }

      transaction.id = null;
      transaction.status = payloadTx.status as TransactionStatus;
      await manager.save(transaction);

      if (transaction.status === TransactionStatus.APPROVED) {
        const order = await manager.findOneBy(OrdersEntity, {
          id: transaction.order.id,
        });

        if (order) {
          console.log('Success update status order');
          order.status = OrderStatus.PAID;
          await manager.save(order);
        }

        if (!order) {
          throw new ApiException('Orden no encontrada', 404);
        }

        for (const item of order.items) {
          const product = await manager.findOne(ProductEntity, {
            where: { id: item.product_id },
          });

          if (!product) {
            throw new ApiException(
              `Producto con ID ${item.product_id} no encontrado`,
              404,
            );
          }

          if (product.stock < item.quantity) {
            throw new ApiException(
              `Stock insuficiente para el producto ${product.name}`,
              400,
            );
          }

          product.stock -= item.quantity;
          await manager.save(product);
        }
      }
    });
  }
}
