import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { WompiTransactionDto } from './wompi-transaction.dto';

export class InitiatePaymentRequestDto {
  @ApiProperty({
    example: 123,
    description: 'ID of the order to be paid',
  })
  @IsInt()
  orderId!: number;

  @ApiProperty({ type: () => WompiTransactionDto })
  @ValidateNested()
  @Type(() => WompiTransactionDto)
  wompi!: WompiTransactionDto;
}
