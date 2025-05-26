import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class AddressRequestDto {
  @ApiProperty({
    example: 'Cra 45 #123-56',
    description: 'Dirección principal',
  })
  @IsString()
  @IsNotEmpty()
  addressLine1!: string;

  @ApiProperty({
    example: 'Apartamento 101',
    description: 'Información adicional',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ example: 'Medellín', description: 'Ciudad del usuario' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: 'Antioquia', description: 'Departamento o región' })
  @IsString()
  @IsNotEmpty()
  region!: string;

  @ApiProperty({
    example: 'CO',
    description: 'Código del país en formato ISO (ej. CO)',
  })
  @IsString()
  @Length(2, 2)
  country!: string;

  @ApiProperty({
    example: 'true',
    description: 'Si la dirección va a ser la que se envía',
  })
  @IsBoolean()
  isActive!: boolean;

  @ApiProperty({
    example: '050021',
    description: 'Código postal',
    required: false,
  })
  @IsString()
  @IsOptional()
  postalCode?: string;
}
