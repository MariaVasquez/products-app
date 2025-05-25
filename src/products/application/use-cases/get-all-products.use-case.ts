import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetAllProductsUseCase } from './interfaces/get-all-products.use-case.interface';
import { Result } from 'src/shared/result/result';
import { ProductResponseDto } from 'src/products/interfaces/http/dtos/product-response.dto';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class GetAllProductsUseCaseImpl implements GetAllProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(): Promise<Result<ProductResponseDto[]>> {
    const products = await this.productRepo.findAll();
    const result = products.map((i) => ProductMapper.domainToInterface(i));
    return Result.ok(result, 'PRODUCTS_FOUND', 'Productos encontrados', 200);
  }
}
