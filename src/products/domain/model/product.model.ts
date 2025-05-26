import { ProductImage } from './product-image.model';

export class Product {
  constructor(
    public readonly id: number | null,
    public name: string,
    public description: string,
    public price: number,
    public currency: string,
    public stock: number,
    public isActive: boolean,
    public images: ProductImage[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
