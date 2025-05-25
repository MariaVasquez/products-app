import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { GetUserByIdUseCase } from './interfaces/get-user-by-id.use-case.interface';
import { Result } from '../../../shared/result/result';
import { UserResponseDto } from 'src/users/interfaces/http/dto/user-response.dto';
import { ResponseCodes } from '../../../shared/response-code';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {
  constructor(
    private readonly configService: ConfigService,
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}
  async execute(id: number): Promise<Result<UserResponseDto>> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      return Result.fail<UserResponseDto>(
        ResponseCodes.USER_NOT_FOUND.code,
        ResponseCodes.USER_NOT_FOUND.message,
        ResponseCodes.USER_NOT_FOUND.httpStatus,
        [],
      );
    }
    return Result.ok(
      UserMapper.domainToInterfaces(user),
      ResponseCodes.TRANSACTION_SUCCESS.code,
      ResponseCodes.TRANSACTION_SUCCESS.message,
      ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
    );
  }
}
