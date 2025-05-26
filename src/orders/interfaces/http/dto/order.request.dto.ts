import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { OrderItemRequestDto } from './order-item-request.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderRequestDto {
  @ApiProperty({
    example: 42,
    description: 'ID of the user placing the order',
  })
  @IsInt()
  userId!: number;

  @ApiProperty({
    type: [OrderItemRequestDto],
    description: 'List of products included in the order',
    example: [
      { productId: 1, quantity: 2 },
      { productId: 5, quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemRequestDto)
  items!: OrderItemRequestDto[];
}
