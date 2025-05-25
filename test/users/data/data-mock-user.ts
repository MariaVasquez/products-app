import { User } from 'src/users/domain/entities/user.entity';
import { UserRequestDto } from 'src/users/interfaces/http/dto/user-request.dto';

export const mockUserRequest: UserRequestDto = {
  name: 'Maria',
  lastname: 'Vásquez',
  email: 'test@example.com',
  phoneNumber: '3214567890',
  typeDocument: 'CC',
  documentNumber: '123456789',
  address: [
    {
      addressLine1: 'Cra 45 #123-56',
      addressLine2: 'Apartamento 101',
      city: 'Medellín',
      region: 'Antioquia',
      country: 'CO',
      isActive: true,
      postalCode: '050021',
    },
  ],
};

export const mockUserEntity: User = {
  id: 1,
  name: 'Maria',
  lastname: 'Vásquez',
  email: 'test@example.com',
  phoneNumber: '123',
  typeDocument: 'CC',
  documentNumber: '999',
  address: [
    {
      addressLine1: 'Cra 45 #123-56',
      addressLine2: 'Apartamento 101',
      city: 'Medellín',
      region: 'Antioquia',
      country: 'CO',
      isActive: true,
      postalCode: '050021',
    },
  ],
};

export const input = {
  email: 'test@example.com',
  name: 'Maria',
  lastname: 'Vasquez',
  phoneNumber: '123',
  documentNumber: '456',
  typeDocument: 'CC',
  address: new Array(6).fill({ addressLine1: 'x', addressLine2: 'x' }),
};
