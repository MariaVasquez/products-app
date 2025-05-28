import { ProductResponseDto } from 'src/products/controllers/dtos/product-response.dto';
import { Result } from 'src/shared/result/result';

export interface UpdateQuantityProductUseCase {
  execute(id: number, quantity: number): Promise<Result<ProductResponseDto>>;
}
