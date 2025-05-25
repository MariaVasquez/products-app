import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductByIdUseCase } from './interfaces/get-product-by-id.use-case.interface';
import { Result } from 'src/shared/result/result';
import { ProductResponseDto } from 'src/products/interfaces/http/dtos/product-response.dto';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class GetProductByIdUseCaseImpl implements GetProductByIdUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(id: number): Promise<Result<ProductResponseDto>> {
    const product = await this.productRepo.findById(id);
    if (!product) {
      return Result.fail('NOT_FOUND', 'Producto no encontrado', 404);
    }
    const result = ProductMapper.domainToInterface(product);
    return Result.ok(result, 'PRODUCT_FOUND', 'Producto encontrado', 200);
  }
}
