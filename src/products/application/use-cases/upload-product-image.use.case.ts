import { Inject, Injectable } from '@nestjs/common';
import { ProductImage } from 'src/products/domain/entities/product-image.entity';
import { ProductImageRepository } from 'src/products/domain/repositories/product-image.repository';
import { ImageStorageService } from 'src/products/domain/services/image-storage.service';
import { ProductImageRequestDto } from 'src/products/interfaces/http/dtos/product-image-request.dto';
import { UploadProductImageUseCase } from './interfaces/upload-product-image.use.case.interface';

@Injectable()
export class UploadProductImageUseCaseImpl
  implements UploadProductImageUseCase
{
  constructor(
    @Inject('ProductImageRepository')
    private readonly imageRepo: ProductImageRepository,
    @Inject('ImageStorageService')
    private readonly storage: ImageStorageService,
  ) {}

  async execute(
    productImagesRequest: ProductImageRequestDto,
  ): Promise<ProductImage> {
    const base64 = productImagesRequest.content.includes(',')
      ? productImagesRequest.content.split(',')[1]
      : productImagesRequest.content;

    const buffer = Buffer.from(base64, 'base64');
    const key = `products/${Date.now()}-${productImagesRequest.filename}`;

    const url = await this.storage.uploadImage(
      key,
      buffer,
      productImagesRequest.mimeType,
    );

    const image = new ProductImage(
      null,
      url,
      productImagesRequest.isMain,
      productImagesRequest.order,
      productImagesRequest.productId,
    );

    return this.imageRepo.save(image);
  }
}
