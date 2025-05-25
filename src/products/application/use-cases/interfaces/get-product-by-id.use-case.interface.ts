import { ProductResponseDto } from 'src/products/interfaces/http/dtos/product-response.dto';
import { Result } from 'src/shared/result/result';

export interface GetProductByIdUseCase {
  execute(id: number): Promise<Result<ProductResponseDto>>;
}
