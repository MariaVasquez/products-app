import { OrderTransaction } from 'src/orders/domain/models/order-transactions.model';

export interface OrderTransactionRepository {
  save(transaction: OrderTransaction): Promise<OrderTransaction>;
  findByReference(reference: string): Promise<OrderTransaction | null>;
}
