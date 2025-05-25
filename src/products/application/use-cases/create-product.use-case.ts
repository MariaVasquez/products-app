import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProductUseCase } from './interfaces/create-product.use-case.interface';
import { ProductRequestDto } from 'src/products/interfaces/http/dtos/product-request.dto';
import { Result } from 'src/shared/result/result';
import { ProductResponseDto } from 'src/products/interfaces/http/dtos/product-response.dto';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class CreateProductUseCaseImpl implements CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(input: ProductRequestDto): Promise<Result<ProductResponseDto>> {
    const product = new Product(
      null,
      input.name,
      input.description,
      input.price,
      input.currency,
      input.stock,
      input.isActive ?? true,
      [],
    );

    const saved = await this.productRepo.save(product);
    const response = ProductMapper.domainToInterface(saved);

    return Result.ok(response, 'TRAPP_SUCC_6', 'Producto creado', 201);
  }
}
