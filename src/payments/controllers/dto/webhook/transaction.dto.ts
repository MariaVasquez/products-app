import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  @ApiProperty()
  id!: string;

  @IsString()
  @ApiProperty()
  status!: string;

  @IsNumber()
  @ApiProperty()
  amount_in_cents!: number;

  @IsString()
  @ApiProperty()
  reference!: string;

  @IsString()
  @ApiProperty()
  payment_method_type!: string;

  @IsString()
  @ApiProperty()
  currency!: string;
}
