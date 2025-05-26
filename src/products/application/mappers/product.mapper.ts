import { ProductImage } from 'src/products/domain/model/product-image.model';
import { Product } from 'src/products/domain/model/product.model';
import { ProductEntity } from 'src/products/infrastructure/database/entities/product.entity';
import { ProductImageResponseDto } from 'src/products/controllers/dtos/product-image-response.dto';
import { ProductResponseDto } from 'src/products/controllers/dtos/product-response.dto';

export class ProductMapper {
  static entityToInterface(entity: ProductEntity): ProductResponseDto {
    const responseProductImage = entity.images.map((i) => {
      const dto = new ProductImageResponseDto();
      dto.id = i.id;
      dto.url = i.url;
      dto.isMain = i.isMain;
      dto.order = i.order;
      return dto;
    });

    const response = new ProductResponseDto();
    response.id = entity.id;
    response.name = entity.name;
    response.description = entity.description;
    response.price = entity.price;
    response.currency = entity.currency;
    response.stock = entity.stock;
    response.isActive = entity.isActive;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.images = responseProductImage;
    return response;
  }

  static domainToInterface(domain: Product): ProductResponseDto {
    const responseProductImage = domain.images.map((i) => {
      const dto = new ProductImageResponseDto();
      dto.id = i.id;
      dto.url = i.url;
      dto.isMain = i.isMain;
      dto.order = i.order;
      return dto;
    });

    const response = new ProductResponseDto();
    response.id = domain.id;
    response.name = domain.name;
    response.description = domain.description;
    response.price = domain.price;
    response.currency = domain.currency;
    response.stock = domain.stock;
    response.isActive = domain.isActive;
    response.createdAt = domain.createdAt;
    response.updatedAt = domain.updatedAt;
    response.images = responseProductImage;
    return response;
  }

  static domainToEntity(p: ProductEntity): Product {
    const productImages = p?.images.map(
      (i) =>
        new ProductImage(
          i.id,
          i.url,
          i.isMain,
          i.order,
          p.id,
          i.createdAt,
          i.updatedAt,
        ),
    );
    const product = new Product(
      p?.id,
      p.name,
      p.description,
      p.price,
      p.currency,
      p.stock,
      p.isActive,
      productImages ?? [],
      p.createdAt,
      p.updatedAt,
    );
    return product;
  }
}
