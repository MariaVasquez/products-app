import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty()
  addressLine1!: string;

  @ApiProperty({ required: false })
  addressLine2?: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  region!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({ required: false })
  postalCode?: string;
}
