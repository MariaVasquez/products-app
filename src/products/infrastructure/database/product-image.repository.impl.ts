import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageRepository } from '../../domain/repositories/product-image.repository';
import { ProductImageEntity } from './entities/product-images.entity';
import { ProductImage } from '../../../products/domain/model/product-image.model';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductImageRepositoryImpl implements ProductImageRepository {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly repo: Repository<ProductImageEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
  async save(image: ProductImage): Promise<ProductImage> {
    const product = await this.productRepo.findOneByOrFail({
      id: image.productId,
    });

    const entity = this.repo.create({
      url: image.url,
      isMain: image.isMain,
      order: image.order,
      product,
    });

    const saved = await this.repo.save(entity);

    return new ProductImage(
      saved.id,
      saved.url,
      saved.isMain,
      saved.order,
      saved.product.id,
    );
  }
  async findByProductId(productId: number): Promise<ProductImage[]> {
    const entities = await this.repo.find({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    return entities.map(
      (e) => new ProductImage(e.id, e.url, e.isMain, e.order, e.product.id),
    );
  }

  async deleteByProductId(productId: number): Promise<void> {
    await this.repo.delete(productId);
  }
}
