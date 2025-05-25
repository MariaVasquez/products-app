import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './interfaces/http/user.controller';
import { UserEntity } from './infrastructure/database/entities/user.entity';
import { AddressEntity } from './infrastructure/database/entities/address.entity';
import { UserRepositoryImpl } from './infrastructure/database/user.repository.impl';
import { CreateUserUseCaseImpl } from './application/use-cases/create-user.use-case';
import { ConfigModule } from '@nestjs/config';
import { GetUserByIdUseCaseImpl } from './application/use-cases/get-user-by-id.use-case';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'GetUserByIdUseCase',
      useClass: GetUserByIdUseCaseImpl,
    },
    {
      provide: 'CreateUserUseCase',
      useClass: CreateUserUseCaseImpl,
    },
  ],
  exports: ['UserRepository', 'CreateUserUseCase'],
})
export class UsersModule {}
