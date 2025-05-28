import { Module } from '@nestjs/common';
import { ProductEntity } from './infrastructure/database/entities/product.entity';
import { ProductImageEntity } from './infrastructure/database/entities/product-images.entity';
import { ProductRepositoryImpl } from './infrastructure/database/product.repository.impl';
import { ProductImageRepositoryImpl } from './infrastructure/database/product-image.repository.impl';
import { CreateProductUseCaseImpl } from './application/use-cases/create-product.use-case';
import { GetProductByIdUseCaseImpl } from './application/use-cases/get-product-by-id.use-case';
import { GetAllProductsUseCaseImpl } from './application/use-cases/get-all-products.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3ImageStorageService } from './infrastructure/services/s3-image-storage.service';
import { ConfigModule } from '@nestjs/config';
import { UploadProductImageUseCaseImpl } from './application/use-cases/upload-product-image.use.case';
import { ProductController } from './controllers/product.controller';
import { UpdateQuantityProductUseCaseImpl } from './application/use-cases/update-quantity-product.use-case';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ProductEntity, ProductImageEntity]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: 'ProductRepository', useClass: ProductRepositoryImpl },
    { provide: 'ProductImageRepository', useClass: ProductImageRepositoryImpl },
    { provide: 'CreateProductUseCase', useClass: CreateProductUseCaseImpl },
    { provide: 'GetProductByIdUseCase', useClass: GetProductByIdUseCaseImpl },
    { provide: 'GetAllProductsUseCase', useClass: GetAllProductsUseCaseImpl },
    {
      provide: 'UploadProductImageUseCase',
      useClass: UploadProductImageUseCaseImpl,
    },
    {
      provide: 'ImageStorageService',
      useClass: S3ImageStorageService,
    },
    {
      provide: 'UpdateQuantityProductUseCase',
      useClass: UpdateQuantityProductUseCaseImpl,
    },
  ],
  exports: [
    'ProductRepository',
    'CreateProductUseCase',
    'GetProductByIdUseCase',
    'GetAllProductsUseCase',
    'UpdateQuantityProductUseCase',
  ],
})
export class ProductsModule {}
