import { Address } from './adress.entity';

export class User {
  constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly typeDocument: string,
    public readonly documentNumber: string,
    public readonly address: Address[],
    public readonly id?: number,
  ) {}
}
