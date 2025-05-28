import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductImageResponseDto {
  @ApiProperty()
  @IsString()
  color!: string;

  @ApiProperty()
  @IsString()
  hexadecimalRgb!: string;
}
