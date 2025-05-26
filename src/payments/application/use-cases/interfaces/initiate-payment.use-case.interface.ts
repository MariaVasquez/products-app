import { InitiatePaymentRequestDto } from 'src/payments/controllers/dto/initiate-payment-request.dto';
import { InitiatePaymentResponseDto } from 'src/payments/controllers/dto/initiate-payment-response.dto';
import { Result } from 'src/shared/result/result';

export interface InitiatePaymentUseCase {
  execute(
    dto: InitiatePaymentRequestDto,
  ): Promise<Result<InitiatePaymentResponseDto>>;
}
