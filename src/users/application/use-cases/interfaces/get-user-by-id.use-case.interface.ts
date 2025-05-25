import { Result } from 'src/shared/result/result';
import { UserResponseDto } from 'src/users/interfaces/http/dto/user-response.dto';

export interface GetUserByIdUseCase {
  execute(id: number): Promise<Result<UserResponseDto>>;
}
