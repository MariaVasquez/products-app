import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsUrl } from 'class-validator';

export class WompiTransactionDto {
  @ApiProperty({ example: 450000 })
  @IsInt()
  amountInCents!: number;

  @ApiProperty({ example: 'COP' })
  @IsString()
  currency!: string;

  @ApiProperty({ example: 'cliente@correo.com' })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({ example: 'tok_sandbox_ABC123456' })
  @IsString()
  paymentToken!: string;

  @ApiProperty({ example: 'https://tusitio.com/thanks' })
  @IsUrl()
  redirectUrl!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  installments!: number;
}
