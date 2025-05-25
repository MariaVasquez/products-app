export class Address {
  constructor(
    public readonly addressLine1: string,
    public readonly city: string,
    public readonly region: string,
    public readonly country: string,
    public readonly addressLine2?: string,
    public readonly postalCode?: string,
    public readonly isActive: boolean = false,
  ) {}
}
