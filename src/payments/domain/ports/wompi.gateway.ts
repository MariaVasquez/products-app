import { WompiResponse } from 'src/payments/controllers/dto/wompi-response.dto';
import { WompiTransactionDto } from 'src/payments/controllers/dto/wompi-transaction.dto';

export interface WompiGateway {
  initiateTransaction(dto: WompiTransactionDto): Promise<WompiResponse>;
}
