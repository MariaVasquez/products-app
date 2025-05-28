import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { WompiTransactionDto } from '../../../payments/controllers/dto/wompi-transaction.dto';
import { WompiGateway } from '../../../payments/domain/ports/wompi.gateway';
import { WompiResponse } from '../../../payments/controllers/dto/wompi-response.dto';
import { WompiApiResponse } from './wompi-api-response.interface';
import * as crypto from 'crypto';
import { WompiMerchantResponse } from './wompi.merchant.response.interface';
import { ResponseCodes } from '../../../shared/response-code';
import { ApiException } from '../../../shared/exceptions/ApiException';

@Injectable()
export class WompiHttpAdapter implements WompiGateway {
  constructor(private readonly httpService: HttpService) {}

  async initiateTransaction(
    dto: WompiTransactionDto,
    reference: string,
  ): Promise<WompiResponse> {
    try {
      const merchantResponse: AxiosResponse<WompiMerchantResponse> =
        await firstValueFrom(
          this.httpService.get(
            `${process.env.WOMPI_API_URL}/merchants/${process.env.WOMPI_PUBLIC_KEY}`,
          ),
        );

      const acceptanceToken =
        merchantResponse.data.data.presigned_acceptance.acceptance_token;

      const payload = {
        acceptance_token: acceptanceToken,
        amount_in_cents: dto.amountInCents,
        currency: dto.currency,
        customer_email: dto.customerEmail,
        payment_method: {
          type: 'CARD',
          token: dto.paymentToken,
          installments: dto.installments,
        },
        reference: reference,
        redirect_url: dto.redirectUrl,
        signature: this.processSignature(dto, reference),
      };

      const response: AxiosResponse<WompiApiResponse> = await firstValueFrom(
        this.httpService.post(
          `${process.env.WOMPI_API_URL}/transactions`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const responseWompi = new WompiResponse();
      responseWompi.transactionId = response.data.data.id;
      responseWompi.status = response.data.data.status;
      responseWompi.redirectUrl = dto.redirectUrl;

      return responseWompi;
    } catch {
      throw new ApiException(
        ResponseCodes.TRANSACTION_NOT_FOUND.message,
        ResponseCodes.TRANSACTION_NOT_FOUND.httpStatus,
      );
    }
  }

  private processSignature(
    dto: WompiTransactionDto,
    reference: string,
  ): string {
    const stringToSign = `${reference}${dto.amountInCents}${dto.currency}${process.env.WOMPI_INTEGRITY_SECRET}`;
    const signature = crypto
      .createHash('sha256')
      .update(stringToSign)
      .digest('hex');
    return signature;
  }
}
