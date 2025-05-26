import { Order } from '../entities/order.entity';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
}
