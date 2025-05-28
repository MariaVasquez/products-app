import { User } from 'src/users/domain/models/user.model';
export interface UserQueryService {
  findById(userId: number): Promise<User | null>;
}
