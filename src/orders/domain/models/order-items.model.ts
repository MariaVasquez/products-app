export class OrderItem {
  constructor(
    public readonly id: number | null,
    public readonly productId: number,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly subtotal: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
