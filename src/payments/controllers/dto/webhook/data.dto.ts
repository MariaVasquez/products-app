import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TransactionDto } from './transaction.dto';

export class DataDto {
  @ValidateNested()
  @Type(() => TransactionDto)
  @ApiProperty({ type: TransactionDto })
  transaction!: TransactionDto;
}
