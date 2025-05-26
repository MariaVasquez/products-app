import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt } from 'class-validator';
import { PaymentMethod } from 'src/shared/enums/payment-method.enum';

export class InitiatePaymentRequestDto {
  @ApiProperty({
    example: 123,
    description: 'ID of the order to be paid',
  })
  @IsInt()
  orderId!: number;

  @ApiProperty({
    example: 'juan.cliente@yopmail.com',
    description: 'Customer email used for the transaction',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    example: PaymentMethod.CARD,
    enum: PaymentMethod,
    description: 'Payment method (e.g., CARD, NEQUI, PSE)',
  })
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
