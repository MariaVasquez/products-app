import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class WompiResponse {
  @ApiProperty({ example: 'txn_sandbox_ABC123' })
  @IsString()
  transactionId!: string;

  @ApiProperty({ example: 'PENDING' })
  @IsString()
  status!: string;

  @ApiProperty({ example: 'https://checkout.wompi.co/transaction/complete' })
  @IsUrl()
  redirectUrl!: string;
}
