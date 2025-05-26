import { ProductImage } from '../model/product-image.model';

export interface ProductImageRepository {
  save(image: ProductImage): Promise<ProductImage>;
  findByProductId(productId: number): Promise<ProductImage[]>;
  deleteByProductId(productId: number): Promise<void>;
}
