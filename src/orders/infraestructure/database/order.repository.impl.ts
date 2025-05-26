import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/orders/domain/repositories/order-repository';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderItemEntity } from './entities/order-items.entity';
import { OrderTransactionEntity } from './entities/order-transactions';
import { ApiException } from 'src/shared/exceptions/ApiException';
import { ResponseCodes } from 'src/shared/response-code';
import { OrderMapper } from 'src/orders/application/mapper/order.mapper';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly repo: Repository<OrdersEntity>,
  ) {}
  async save(order: Order): Promise<Order> {
    try {
      const entityTransaction = order.transactions.map((t) => {
        const transactions = new OrderTransactionEntity();
        transactions.provider = t.provider;
        transactions.status = t.status;
        transactions.amount = t.amount;
        transactions.currency = t.currency;
        transactions.payment_method = t.paymentMethod;
        return transactions;
      });
      const entityItem = order.items.map((i) => {
        const items = new OrderItemEntity();
        items.product_id = i.productId;
        items.product_name = i.productName;
        items.quantity = i.quantity;
        items.unit_price = i.unitPrice;
        items.subtotal = i.subtotal;
        return items;
      });
      const entity = new OrdersEntity();
      entity.user_id = order.userId;
      entity.status = order.status;
      entity.total_amount = order.totalAmount;
      entity.items = entityItem;
      entity.transactions = entityTransaction;
      const create = this.repo.create(entity);
      return OrderMapper.toDomain(await this.repo.save(create));
    } catch (error) {
      console.error(
        ResponseCodes.DATABASE_ERROR.message,
        'for create order in database',
        error,
      );
      throw new ApiException(
        ResponseCodes.DATABASE_ERROR.message,
        ResponseCodes.DATABASE_ERROR.httpStatus,
      );
    }
  }
}
