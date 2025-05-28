import { User } from '../models/user.model';

export interface UserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  delete(id: number): Promise<void>;
}
