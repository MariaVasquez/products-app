import { ProductImage } from '../entities/product-image.entity';

export interface ProductImageRepository {
  save(image: ProductImage): Promise<ProductImage>;
  findByProductId(productId: number): Promise<ProductImage[]>;
  deleteByProductId(productId: number): Promise<void>;
}
