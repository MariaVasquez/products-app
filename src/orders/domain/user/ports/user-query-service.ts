import { User } from 'src/users/domain/entities/user.entity';

export interface UserQueryService {
  findById(userId: number): Promise<User | null>;
}
