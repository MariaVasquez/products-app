import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { CreateUserUseCase } from './interfaces/create-user.use-case.interface';
import { UserRequestDto } from '../../interfaces/dto/user-request.dto';
import { UserResponseDto } from '../../interfaces/dto/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { ConfigService } from '@nestjs/config';
import { FieldError, Result } from '../../../shared/result/result';
import { ResponseCodes } from '../../../shared/response-code';

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    private readonly configService: ConfigService,
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: UserRequestDto): Promise<Result<UserResponseDto>> {
    const fieldErrors: FieldError[] = [];
    const maxAddresses =
      this.configService.get<number>('MAX_USER_ADDRESSES') ?? 5;

    if (input.address.length > maxAddresses) {
      fieldErrors.push({
        field: '',
        error: `El usuario no puede tener más de ${maxAddresses} direcciones registradas.`,
      });

      return Result.fail<UserResponseDto>(
        ResponseCodes.VALIDATION_ERROR.code,
        ResponseCodes.VALIDATION_ERROR.message,
        ResponseCodes.VALIDATION_ERROR.httpStatus,
        fieldErrors,
      );
    }

    const exists = await this.userRepo.findByEmail(input.email);
    if (exists) {
      fieldErrors.push({
        field: '',
        error: `Ya existe un usuario registrado con este correo electrónico.`,
      });

      return Result.fail<UserResponseDto>(
        ResponseCodes.USER_EXIST.code,
        ResponseCodes.USER_EXIST.message,
        ResponseCodes.USER_EXIST.httpStatus,
        fieldErrors,
      );
    }

    const user = UserMapper.interfacesToDomain(input);
    const saved = await this.userRepo.save(user);
    const response = UserMapper.domainToInterfaces(saved);

    return Result.ok(
      response,
      ResponseCodes.CREATE_TRANSACTION.code,
      ResponseCodes.CREATE_TRANSACTION.message,
      ResponseCodes.CREATE_TRANSACTION.httpStatus,
    );
  }
}
