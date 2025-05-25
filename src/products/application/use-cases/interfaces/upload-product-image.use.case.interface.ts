import { ProductImage } from 'src/products/domain/entities/product-image.entity';
import { ProductImageRequestDto } from 'src/products/interfaces/http/dtos/product-image-request.dto';

export interface UploadProductImageUseCase {
  execute(productImagesRequest: ProductImageRequestDto): Promise<ProductImage>;
}
