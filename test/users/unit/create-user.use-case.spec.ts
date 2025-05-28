import { ConfigService } from '@nestjs/config';
import { CreateUserUseCaseImpl } from '../../../src/users/application/use-cases/create-user.use-case';
import { UserRepository } from '../../../src/users/domain/repositories/user.repository';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { input, mockUserEntity, mockUserRequest } from '../data/data-mock-user';

/*describe('CreateUserUseCaseImpl', () => {
  let mockConfigService: DeepMockProxy<ConfigService>;
  let mockUserRepo: DeepMockProxy<UserRepository>;
  let useCase: CreateUserUseCaseImpl;

  beforeEach(() => {
    mockConfigService = mockDeep<ConfigService>();
    mockUserRepo = mockDeep<UserRepository>();

    mockReset(mockConfigService);
    mockReset(mockUserRepo);

    useCase = new CreateUserUseCaseImpl(mockConfigService, mockUserRepo);
  });

  it('Guardado exitoso', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.save.mockResolvedValue(mockUserEntity);
    const result = await useCase.execute(mockUserRequest);
    expect(result.isSuccess()).toBe(true);
  });

  it('Error cuando tiene más de 5 direcciones', async () => {
    const result = await useCase.execute(input);
    expect(result.isFailure()).toBe(true);
  });

  it('Error cuando ya existe el usuario con el email', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(mockUserEntity);
    const result = await useCase.execute(mockUserRequest);
    expect(result.isFailure()).toBe(true);
  });
});*/
