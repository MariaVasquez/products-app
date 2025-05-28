import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../../shared/enums/currency.enum';

export class InitiatePaymentResponseDto {
  @ApiProperty({
    example: 'ORDER-1234-550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique reference for the transaction',
  })
  reference!: string;

  @ApiProperty({
    example: 450000,
    description: 'Total amount of the transaction in cents',
  })
  amountInCents!: number;

  @ApiProperty({
    example: Currency.COP,
    enum: Currency,
    description: 'Currency of the transaction',
  })
  currency!: Currency;

  @ApiProperty({
    example: 'cliente@yopmail.com',
    description: 'Email address of the payer',
  })
  customerEmail!: string;

  @ApiProperty({
    example: 'pub_test_xxxx',
    description: 'Public key to use with Wompi frontend widget',
  })
  publicKey!: string;
}
