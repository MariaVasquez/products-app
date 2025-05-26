import { ProductRequestDto } from 'src/products/controllers/dtos/product-request.dto';
import { ProductResponseDto } from 'src/products/controllers/dtos/product-response.dto';
import { Result } from 'src/shared/result/result';

export interface CreateProductUseCase {
  execute(input: ProductRequestDto): Promise<Result<ProductResponseDto>>;
}
