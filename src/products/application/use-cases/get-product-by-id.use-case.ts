import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductByIdUseCase } from './interfaces/get-product-by-id.use-case.interface';
import { Result } from 'src/shared/result/result';
import { ProductResponseDto } from 'src/products/interfaces/http/dtos/product-response.dto';
import { ProductMapper } from '../mappers/product.mapper';
import { ResponseCodes } from 'src/shared/response-code';

@Injectable()
export class GetProductByIdUseCaseImpl implements GetProductByIdUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(id: number): Promise<Result<ProductResponseDto>> {
    const product = await this.productRepo.findById(id);
    if (!product) {
      return Result.fail<ProductResponseDto>(
        ResponseCodes.PRODUCT_NOT_FOUND.code,
        ResponseCodes.PRODUCT_NOT_FOUND.message,
        ResponseCodes.PRODUCT_NOT_FOUND.httpStatus,
        [],
      );
    }
    const result = ProductMapper.domainToInterface(product);
    return Result.ok(
      result,
      ResponseCodes.TRANSACTION_SUCCESS.code,
      ResponseCodes.TRANSACTION_SUCCESS.message,
      ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
    );
  }
}
