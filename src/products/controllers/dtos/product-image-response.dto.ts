import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsUrl } from 'class-validator';

export class ProductImageResponseDto {
  @ApiProperty()
  id!: number | null;

  @ApiProperty()
  @IsUrl()
  url!: string;

  @ApiProperty()
  @IsBoolean()
  isMain!: boolean;

  @ApiProperty()
  @IsInt()
  order!: number;

  @ApiProperty()
  createdAt!: Date | undefined;

  @ApiProperty()
  updatedAt!: Date | undefined;
}
