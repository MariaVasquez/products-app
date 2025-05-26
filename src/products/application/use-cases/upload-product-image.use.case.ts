import { Inject, Injectable } from '@nestjs/common';
import { ProductImage } from 'src/products/domain/model/product-image.model';
import { ProductImageRepository } from 'src/products/domain/repositories/product-image.repository';
import { ImageStorageService } from 'src/products/domain/services/image-storage.service';
import { ProductImageRequestDto } from 'src/products/controllers/dtos/product-image-request.dto';
import { UploadProductImageUseCase } from './interfaces/upload-product-image.use.case.interface';
import { ProductRepository } from 'src/products/domain/repositories/product.repository';
import { Result } from 'src/shared/result/result';
import { ResponseCodes } from 'src/shared/response-code';
import { ProductImageResponseDto } from 'src/products/controllers/dtos/product-image-response.dto';

@Injectable()
export class UploadProductImageUseCaseImpl
  implements UploadProductImageUseCase
{
  constructor(
    @Inject('ProductImageRepository')
    private readonly imageRepo: ProductImageRepository,
    @Inject('ImageStorageService')
    private readonly storage: ImageStorageService,
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(
    productImagesRequest: ProductImageRequestDto,
  ): Promise<Result<ProductImageResponseDto>> {
    try {
      const productExist = await this.productRepo.findById(
        productImagesRequest.productId,
      );

      if (!productExist) {
        return Result.fail<ProductImageResponseDto>(
          ResponseCodes.PRODUCT_NOT_FOUND.code,
          ResponseCodes.PRODUCT_NOT_FOUND.message,
          ResponseCodes.PRODUCT_NOT_FOUND.httpStatus,
          [],
        );
      }

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

      const save = await this.imageRepo.save(image);

      const response = new ProductImageResponseDto();
      response.id = save.id;
      response.url = save.url;
      response.isMain = save.isMain;
      response.order = save.order;
      response.createdAt = save.createdAt;
      response.updatedAt = save.updatedAt;

      return Result.ok(
        response,
        ResponseCodes.UPLOAD_SUCCESS.code,
        ResponseCodes.UPLOAD_SUCCESS.message,
        ResponseCodes.UPLOAD_SUCCESS.httpStatus,
      );
    } catch (error) {
      console.error(
        ResponseCodes.UNEXPECTED_ERROR.message,
        ' for create order',
        error,
      );
      return Result.fail<ProductImageResponseDto>(
        ResponseCodes.UPLOAD_S3_ERROR.code,
        ResponseCodes.UPLOAD_S3_ERROR.message,
        ResponseCodes.UPLOAD_S3_ERROR.httpStatus,
        [],
      );
    }
  }
}
