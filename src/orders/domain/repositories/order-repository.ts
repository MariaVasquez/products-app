import { Order } from '../models/order.model';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order>;
  findOrderByUser(idUser: number): Promise<Order | null>;
}
