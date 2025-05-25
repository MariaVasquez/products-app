import { ProductImageRequestDto } from 'src/products/interfaces/http/dtos/product-image-request.dto';
import { ProductImageResponseDto } from 'src/products/interfaces/http/dtos/product-image-response.dto';
import { Result } from 'src/shared/result/result';

export interface UploadProductImageUseCase {
  execute(
    productImagesRequest: ProductImageRequestDto,
  ): Promise<Result<ProductImageResponseDto>>;
}
