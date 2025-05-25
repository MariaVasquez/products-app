import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { ProductImageEntity } from './entities/product-images.entity';
import { ProductMapper } from 'src/products/application/mappers/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<ProductEntity> {
    const entity = new ProductEntity();
    entity.name = product.name;
    entity.description = product.description;
    entity.price = product.price;
    entity.currency = product.currency;
    entity.stock = product.stock;
    entity.isActive = product.isActive;
    entity.images = product.images?.map((i) => {
      const productImages = new ProductImageEntity();
      productImages.url = i.url;
      productImages.isMain = i.isMain;
      productImages.order = i.order;
      return productImages;
    });
    return await this.repo.save(entity);
  }

  async findById(id: number): Promise<Product | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['images'],
    });
    return entity ? ProductMapper.domainToEntity(entity) : null;
  }

  async findAll(): Promise<Product[]> {
    const entity = await this.repo.find({ relations: ['images'] });
    return entity.map((p) => ProductMapper.domainToEntity(p));
  }
}
