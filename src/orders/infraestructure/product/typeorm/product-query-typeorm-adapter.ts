import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductQueryService } from '../../../../orders/domain/product/ports/product-query-service';
import { ProductMapper } from '../../../../products/application/mappers/product.mapper';
import { Product } from '../../../../products/domain/model/product.model';
import { ProductEntity } from '../../../../products/infrastructure/database/entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductQueryTypeormAdapter implements ProductQueryService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  async findByIds(ids: number[]): Promise<Product[]> {
    const entities = await this.repo.findBy({
      id: In(ids),
    });

    return entities.map((e) => ProductMapper.domainToEntity(e));
  }
}
