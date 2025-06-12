import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsUrl } from 'class-validator';

export class WompiTransactionDto {
  @ApiProperty({
    example: 450000,
    description:
      'Monto total de la transacción en centavos (1 COP = 100 centavos). Por ejemplo, 450000 equivale a $4.500 COP.',
  })
  @IsInt()
  amountInCents!: number;

  @IsInt()
  amountInCentsIva!: number;

  @ApiProperty({
    example: 'COP',
    description:
      'Moneda utilizada en la transacción. Debe coincidir con la configuración de la cuenta Wompi. Generalmente "COP".',
  })
  @IsString()
  currency!: string;

  @ApiProperty({
    example: 'cliente@correo.com',
    description:
      'Correo electrónico del pagador. Wompi lo utiliza para notificaciones y validaciones.',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    example: 'tok_sandbox_ABC123456',
    description:
      'Token de pago generado por el frontend mediante el widget o SDK de Wompi.',
  })
  @IsString()
  paymentToken!: string;

  @ApiProperty({
    example: 'https://tusitio.com/thanks',
    description:
      'URL a la cual se redirige al usuario al finalizar el proceso de pago en Wompi.',
  })
  @IsUrl()
  redirectUrl!: string;

  @ApiProperty({
    example: 1,
    description:
      'Número de cuotas (cuotas sin interés o financiamiento si la pasarela lo permite). Generalmente 1 para pagos de contado.',
  })
  @IsInt()
  installments!: number;
}
