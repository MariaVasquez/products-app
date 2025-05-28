import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetAllProductsUseCase } from './interfaces/get-all-products.use-case.interface';
import { Result } from 'src/shared/result/result';
import { ProductResponseDto } from 'src/products/controllers/dtos/product-response.dto';
import { ProductMapper } from '../mappers/product.mapper';
import { ResponseCodes } from '../../../shared/response-code';

@Injectable()
export class GetAllProductsUseCaseImpl implements GetAllProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(): Promise<Result<ProductResponseDto[]>> {
    const products = await this.productRepo.findAll();
    const result = products.map((i) => ProductMapper.domainToInterface(i));
    return Result.ok(
      result,
      ResponseCodes.TRANSACTION_SUCCESS.code,
      ResponseCodes.TRANSACTION_SUCCESS.message,
      ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
    );
  }
}
