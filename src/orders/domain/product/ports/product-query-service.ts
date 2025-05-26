import { Product } from 'src/products/domain/model/product.model';

export interface ProductQueryService {
  findByIds(productIds: number[]): Promise<Product[]>;
}
