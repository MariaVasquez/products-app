import { Product } from 'src/products/domain/entities/product.entity';

export interface ProductQueryService {
  findByIds(productIds: number[]): Promise<Product[]>;
}
