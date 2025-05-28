import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/repositories/product.repository';
import { UpdateQuantityProductUseCase } from './interfaces/update-quantity-product.use-case.interface';
import { ProductResponseDto } from 'src/products/controllers/dtos/product-response.dto';
import { Result } from 'src/shared/result/result';
import { ProductMapper } from '../mappers/product.mapper';
import { ResponseCodes } from 'src/shared/response-code';

@Injectable()
export class UpdateQuantityProductUseCaseImpl
  implements UpdateQuantityProductUseCase
{
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}
  async execute(
    id: number,
    quantity: number,
  ): Promise<Result<ProductResponseDto>> {
    const updateProduct = await this.productRepo.updateQuantity(id, quantity);
    const result = ProductMapper.domainToInterface(updateProduct);
    return Result.ok(
      result,
      ResponseCodes.TRANSACTION_SUCCESS.code,
      ResponseCodes.TRANSACTION_SUCCESS.message,
      ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
    );
  }
}
