import { ApiProperty } from '@nestjs/swagger';
import { ProductImageResponseDto } from './product-image-response.dto';

export class ProductResponseDto {
  @ApiProperty()
  id!: number | null;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  stock!: number;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: Date | undefined;

  @ApiProperty()
  updatedAt!: Date | undefined;

  @ApiProperty({ type: [ProductImageResponseDto] })
  images!: ProductImageResponseDto[];
}
