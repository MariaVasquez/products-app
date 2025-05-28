import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductColorRequestDto {
  @ApiProperty({
    description: 'Nombre del color',
    example: 'Rosa',
  })
  @IsString()
  color!: string;

  @ApiProperty({
    description: 'RGB del color',
    example: '#ff69b4',
  })
  @IsString()
  hexadecimalRgb!: string;
}
