import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class ProductImageRequestDto {
  @IsString()
  filename!: string;

  @IsString()
  content!: string;

  @IsString()
  mimeType!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isMain!: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  order!: number;

  productId!: number;
}
