import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQueryService } from 'src/orders/domain/user/ports/user-query-service';
import { UserMapper } from 'src/users/application/mappers/user.mapper';
import { User } from 'src/users/domain/entities/user.entity';
import { UserEntity } from 'src/users/infrastructure/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueryTypeormAdapter implements UserQueryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.repo.findOne({ where: { id } });
    return userEntity ? UserMapper.infraToDomain(userEntity) : null;
  }
}
