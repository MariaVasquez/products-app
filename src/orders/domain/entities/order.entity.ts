import { OrderStatus } from 'src/shared/enums/order-status.enum';
import { OrderItem } from './order-items.entity';
import { OrderTransaction } from './order-transactions';

export class Order {
  constructor(
    public readonly id: number | null,
    public readonly userId: number,
    public status: OrderStatus,
    public totalAmount: number,
    public readonly items: OrderItem[],
    public readonly transactions: OrderTransaction[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
