import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class OrderItemRequestDto {
  @ApiProperty({
    example: 3,
    description: 'Unique identifier of the product',
  })
  @IsInt()
  productId!: number;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product to be ordered',
  })
  @IsInt()
  quantity!: number;
}
