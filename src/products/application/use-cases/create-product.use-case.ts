import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProductUseCase } from './interfaces/create-product.use-case.interface';
import { ProductRequestDto } from 'src/products/controllers/dtos/product-request.dto';
import { Result } from 'src/shared/result/result';
import { ProductResponseDto } from 'src/products/controllers/dtos/product-response.dto';
import { Product } from 'src/products/domain/model/product.model';
import { ProductMapper } from '../mappers/product.mapper';
import { ResponseCodes } from '../../../shared/response-code';

@Injectable()
export class CreateProductUseCaseImpl implements CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(input: ProductRequestDto): Promise<Result<ProductResponseDto>> {
    const productValidate = await this.productRepo.findByName(input.name);
    if (productValidate) {
      return Result.fail<ProductResponseDto>(
        ResponseCodes.PRODUCT_EXIST.code,
        ResponseCodes.PRODUCT_EXIST.message,
        ResponseCodes.PRODUCT_EXIST.httpStatus,
        [],
      );
    }
    const product = new Product(
      null,
      input.name,
      input.description,
      input.price,
      input.currency,
      input.stock,
      input.isActive ?? true,
      [],
      input.productColor ?? { color: 'Unico', hexadecimalRgb: '#ffffff' },
    );

    const saved = await this.productRepo.save(product);
    const response = ProductMapper.domainToInterface(saved);

    return Result.ok(
      response,
      ResponseCodes.CREATE_TRANSACTION.code,
      ResponseCodes.CREATE_TRANSACTION.message,
      ResponseCodes.CREATE_TRANSACTION.httpStatus,
    );
  }
}
