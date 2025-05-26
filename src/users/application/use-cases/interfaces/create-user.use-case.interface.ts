import { Result } from 'src/shared/result/result';
import { UserRequestDto } from 'src/users/interfaces/dto/user-request.dto';
import { UserResponseDto } from 'src/users/interfaces/dto/user-response.dto';

export interface CreateUserUseCase {
  execute(input: UserRequestDto): Promise<Result<UserResponseDto>>;
}
