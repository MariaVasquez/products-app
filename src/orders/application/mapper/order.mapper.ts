import { OrderItem } from '../../../orders/domain/models/order-items.model';
import { OrderTransaction } from '../../../orders/domain/models/order-transactions.model';
import { Order } from '../../../orders/domain/models/order.model';
import { OrdersEntity } from '../../../orders/infraestructure/database/entities/orders.entity';

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
          t.order.id,
          t.createdAt,
          t.updatedAt,
        ),
    );

    return new Order(
      entity.id,
      entity.user_id,
      entity.status,
      entity.iva,
      entity.subtotal_amount,
      entity.total_amount,
      items,
      transactions,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
