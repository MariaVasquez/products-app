import { Order } from 'src/orders/domain/models/order.model';

export interface OrderQueryService {
  findById(orderId: number): Promise<Order | null>;
}
