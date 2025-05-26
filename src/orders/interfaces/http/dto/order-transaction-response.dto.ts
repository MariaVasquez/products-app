export class OrderTransactionResponseDto {
  id!: number;
  provider!: string;
  externalId!: string;
  status!: string;
  amount!: number;
  currency!: string;
  paymentMethod!: string;
}
