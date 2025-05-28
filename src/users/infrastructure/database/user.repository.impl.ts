import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../../application/mappers/user.mapper';
import { User } from '../../../users/domain/models/user.model';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepo: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const orm = UserMapper.domainToInfra(user);
    const saved = await this.ormRepo.save(orm);
    return UserMapper.infraToDomain(saved);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.ormRepo.findOne({ where: { id } });
    return userEntity ? UserMapper.infraToDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.ormRepo.findOne({ where: { email } });
    return userEntity ? UserMapper.infraToDomain(userEntity) : null;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
