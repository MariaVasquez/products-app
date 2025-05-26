import { OrderItem } from 'src/orders/domain/entities/order-items.entity';
import { OrderTransaction } from 'src/orders/domain/entities/order-transactions';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrdersEntity } from 'src/orders/infraestructure/database/entities/orders.entity';

export class OrderMapper {
  static toDomain(entity: OrdersEntity): Order {
    const items = entity.items.map(
      (i) =>
        new OrderItem(
          i.id,
          i.product_id,
          i.product_name,
          i.quantity,
          i.unit_price,
          i.subtotal,
          i.createdAt,
          i.updatedAt,
        ),
    );

    const transactions = entity.transactions.map(
      (t) =>
        new OrderTransaction(
          t.id,
          t.provider,
          t.external_id,
          t.status,
          t.amount,
          t.currency,
          t.payment_method,
          t.createdAt,
          t.updatedAt,
        ),
    );

    return new Order(
      entity.id,
      entity.user_id,
      entity.status,
      entity.total_amount,
      items,
      transactions,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
