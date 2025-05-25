export class ProductImage {
  constructor(
    public readonly id: number | null,
    public url: string,
    public isMain: boolean,
    public order: number,
    public productId?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
