import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsBoolean,
  Min,
  ValidateNested,
  IsArray,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductImageRequestDto } from './product-image-request.dto';

export class ProductRequestDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta básica para hombre',
  })
  @IsString()
  @Length(1, 100)
  name!: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Camiseta 100% algodón, disponible en varias tallas y colores.',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Precio del producto en la moneda especificada',
    example: 150000,
  })
  @IsInt()
  @Min(0)
  price!: number;

  @ApiProperty({
    description: 'Código de la moneda utilizada (ISO 4217), como COP, USD, EUR',
    example: 'COP',
  })
  @IsString()
  currency!: string;

  @ApiProperty({
    description: 'Cantidad de unidades disponibles en inventario',
    example: 25,
  })
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiProperty({
    description: 'Indica si el producto está activo para la venta',
    example: true,
    default: true,
  })
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({
    description: 'Lista de imágenes asociadas al producto',
    type: [ProductImageRequestDto],
    required: false,
    example: [
      {
        isMain: true,
        order: 1,
        filename: 'product-image-1.jpg',
        content: 'base64encoded==',
        mimeType: 'image/jpeg',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageRequestDto)
  images?: ProductImageRequestDto[];
}
