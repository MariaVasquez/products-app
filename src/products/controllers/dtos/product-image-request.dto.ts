import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class ProductImageRequestDto {
  @ApiProperty({
    description: 'Nombre original del archivo (incluyendo extensión)',
    example: 'lipstick.jpg',
  })
  @IsString()
  filename!: string;

  @ApiProperty({
    description: 'Contenido de la imagen en base64',
    example: 'iVBORw0KGgoAAAANSUhEUgAAA...',
  })
  @IsString()
  content!: string;

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'image/jpeg',
  })
  @IsString()
  mimeType!: string;

  @ApiProperty({
    description: 'Indica si esta imagen será la principal del producto',
    example: true,
  })
  @IsBoolean()
  isMain!: boolean;

  @ApiProperty({
    description: 'Orden en que debe aparecer la imagen al mostrar varias',
    example: 1,
  })
  @IsInt()
  order!: number;

  @ApiProperty({
    description: 'ID del producto al que pertenece la imagen',
    example: 42,
  })
  @IsInt()
  productId!: number;
}
