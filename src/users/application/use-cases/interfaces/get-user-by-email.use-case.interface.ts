import { Result } from '../../../../shared/result/result';
import { UserResponseDto } from '../../../../users/interfaces/dto/user-response.dto';

export interface GetUserByEmailUseCase {
  execute(email: string): Promise<Result<UserResponseDto>>;
}
