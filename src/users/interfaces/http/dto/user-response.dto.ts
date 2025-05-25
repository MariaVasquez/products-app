import { ApiProperty } from '@nestjs/swagger';
import { AddressResponseDto } from './address-response.dto';

export class UserResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  lastname!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phoneNumber!: string;

  @ApiProperty()
  typeDocument!: string;

  @ApiProperty()
  documentNumber!: string;

  @ApiProperty({ type: () => AddressResponseDto })
  address!: AddressResponseDto[];
}
