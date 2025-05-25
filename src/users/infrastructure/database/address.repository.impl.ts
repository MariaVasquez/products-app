import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from 'src/users/domain/repositories/address.repository';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressRepositoryImpl implements AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly ormRepo: Repository<AddressEntity>,
  ) {}

  async countByUserId(userId: number): Promise<number> {
    return this.ormRepo.count({ where: { user: { id: userId } } });
  }
}
