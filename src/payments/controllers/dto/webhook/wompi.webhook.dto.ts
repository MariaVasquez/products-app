import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { DataDto } from './data.dto';
import { SignatureDto } from './signature.dto';

export class WompiWebhookDto {
  @IsString()
  @ApiProperty({ example: 'transaction.updated' })
  event!: string;

  @ValidateNested()
  @Type(() => DataDto)
  @ApiProperty({ type: DataDto })
  data!: DataDto;

  @ValidateNested()
  @Type(() => SignatureDto)
  @ApiProperty({ type: SignatureDto })
  signature!: SignatureDto;
}
