import { OrderItemResponseDto } from './order-item-response.dto';
import { OrderTransactionResponseDto } from './order-transaction-response.dto';

export class OrderResponseDto {
  id!: number;
  userId!: number;
  status!: string;
  totalAmount!: number;
  createdAt!: Date;
  updatedAt!: Date;

  items!: OrderItemResponseDto[];
  transactions?: OrderTransactionResponseDto[];
}
