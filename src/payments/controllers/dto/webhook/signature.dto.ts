import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignatureDto {
  @IsString()
  @ApiProperty()
  checksum!: string;
}
