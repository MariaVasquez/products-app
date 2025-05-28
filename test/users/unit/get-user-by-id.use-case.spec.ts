import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../../src/users/domain/repositories/user.repository';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { mockUserEntity } from '../data/data-mock-user';
import { GetUserByIdUseCaseImpl } from '../../../src/users/application/use-cases/get-user-by-id.use-case';
import { ResponseCodes } from '../../../src/shared/response-code';
/*describe('GetUserByIdUseCase', () => {
  let mockConfigService: DeepMockProxy<ConfigService>;
  let mockUserRepo: DeepMockProxy<UserRepository>;
  let useCase: GetUserByIdUseCaseImpl;

  beforeEach(() => {
    mockConfigService = mockDeep<ConfigService>();
    mockUserRepo = mockDeep<UserRepository>();

    mockReset(mockConfigService);
    mockReset(mockUserRepo);

    useCase = new GetUserByIdUseCaseImpl(mockConfigService, mockUserRepo);
  });
  it('Devuelve usuario exitosamente', async () => {
    mockUserRepo.findById.mockResolvedValue(mockUserEntity);
    const result = await useCase.execute(1);
    expect(result.isSuccess()).toBe(true);
    expect(result.data?.name).toBe('Maria');
  });
  it('Error cuando no existe el usuario', async () => {
    mockUserRepo.findById.mockResolvedValue(null);
    const result = await useCase.execute(1);
    expect(result.isFailure()).toBe(true);
    expect(result.code).toBe(ResponseCodes.USER_NOT_FOUND.code);
  });
});*/
