import { TransactionStatus } from 'src/shared/enums/order-status.enum';

export class OrderTransaction {
  constructor(
    public readonly id: number | null,
    public readonly provider: string,
    public readonly externalId: string,
    public status: TransactionStatus,
    public readonly amount: number,
    public readonly currency: string,
    public readonly paymentMethod: string,
    public readonly orderId?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
