import { UserResponseDto } from '../../interfaces/dto/user-response.dto';
import { AddressResponseDto } from '../../interfaces/dto/address-response.dto';
import { AddressRequestDto } from '../../interfaces/dto/address-request.dto';
import { UserRequestDto } from '../../interfaces/dto/user-request.dto';
import { UserEntity } from '../../infrastructure/database/entities/user.entity';
import { AddressEntity } from '../../infrastructure/database/entities/address.entity';
import { User } from '../../domain/models/user.model';
import { Address } from '../../domain/models/adress.model';

export class UserMapper {
  static interfacesToDomain(dto: UserRequestDto): User {
    const addresses: Address[] = dto.address.map((addr: AddressRequestDto) => {
      return new Address(
        addr.addressLine1,
        addr.city,
        addr.region,
        addr.country,
        addr.addressLine2,
        addr.postalCode,
        addr.isActive,
      );
    });

    return new User(
      dto.name,
      dto.lastname,
      dto.email,
      dto.phoneNumber,
      dto.typeDocument,
      dto.documentNumber,
      addresses,
    );
  }

  static domainToInterfaces(user: User): UserResponseDto {
    const addresses: AddressResponseDto[] = user.address.map(
      (addr: Address) => ({
        addressLine1: addr.addressLine1,
        addressLine2: addr.addressLine2,
        city: addr.city,
        region: addr.region,
        country: addr.country,
        postalCode: addr.postalCode,
        isActive: addr.isActive,
      }),
    );

    return {
      id: user.id!,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      typeDocument: user.typeDocument,
      documentNumber: user.documentNumber,
      address: addresses,
    };
  }

  static domainToInfra(dto: User): UserEntity {
    const userOrm = new UserEntity();
    userOrm.name = dto.name;
    userOrm.lastname = dto.lastname;
    userOrm.email = dto.email;
    userOrm.phoneNumber = dto.phoneNumber;
    userOrm.typeDocument = dto.typeDocument;
    userOrm.documentNumber = dto.documentNumber;

    userOrm.addresses = dto.address.map((addrDto: AddressRequestDto) => {
      const addrOrm = new AddressEntity();
      addrOrm.addressLine1 = addrDto.addressLine1;
      addrOrm.addressLine2 = addrDto.addressLine2;
      addrOrm.city = addrDto.city;
      addrOrm.region = addrDto.region;
      addrOrm.country = addrDto.country;
      addrOrm.postalCode = addrDto.postalCode;
      addrOrm.isActive = addrDto.isActive;
      return addrOrm;
    });

    return userOrm;
  }

  static infraToDomain(userEntity: UserEntity): User {
    const addresses: Address[] = userEntity.addresses.map(
      (addr: AddressEntity) => {
        return new Address(
          addr.addressLine1,
          addr.city,
          addr.region,
          addr.country,
          addr.addressLine2,
          addr.postalCode,
          addr.isActive,
        );
      },
    );

    return new User(
      userEntity.name,
      userEntity.lastname,
      userEntity.email,
      userEntity.phoneNumber,
      userEntity.typeDocument,
      userEntity.documentNumber,
      addresses,
      userEntity.id,
    );
  }
}
