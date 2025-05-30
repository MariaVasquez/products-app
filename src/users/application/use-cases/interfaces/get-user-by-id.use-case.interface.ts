import { Result } from '../../../../shared/result/result';
import { UserResponseDto } from '../../../../users/interfaces/dto/user-response.dto';

export interface GetUserByIdUseCase {
  execute(id: number): Promise<Result<UserResponseDto>>;
}
