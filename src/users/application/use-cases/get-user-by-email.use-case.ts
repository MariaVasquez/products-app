import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseCodes } from '../../../shared/response-code';
import { Result } from '../../../shared/result/result';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { UserResponseDto } from 'src/users/interfaces/dto/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { GetUserByEmailUseCase } from './interfaces/get-user-by-email.use-case.interface';

@Injectable()
export class GetUserByEmailUseCaseImpl implements GetUserByEmailUseCase {
  constructor(
    private readonly configService: ConfigService,
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}
  async execute(email: string): Promise<Result<UserResponseDto>> {
    const user = await this.userRepo.findByEmail(email);
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
