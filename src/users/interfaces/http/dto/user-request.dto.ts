import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddressRequestDto } from './address-request.dto';
import { Type } from 'class-transformer';

export class UserRequestDto {
  @ApiProperty({ example: 'Ana', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'López', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @ApiProperty({
    example: 'ana@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '3214567890', description: 'Teléfono del usuario' })
  @IsString()
  @Length(10, 15)
  phoneNumber!: string;

  @ApiProperty({
    example: 'CC',
    description: 'Tipo de documento (CC, CE, etc.)',
  })
  @IsString()
  @IsNotEmpty()
  typeDocument!: string;

  @ApiProperty({ example: '123456789', description: 'Número de documento' })
  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @ApiProperty({
    type: AddressRequestDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressRequestDto)
  address!: AddressRequestDto[];
}
