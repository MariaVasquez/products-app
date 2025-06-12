import { Inject, Injectable } from '@nestjs/common';
import { Currency } from '../../../shared/enums/currency.enum';
import { v4 as uuid } from 'uuid';
import { InitiatePaymentUseCase } from './interfaces/initiate-payment.use-case.interface';
import { OrderQueryService } from 'src/payments/domain/order/ports/order-query-service';
import { UserQueryService } from 'src/orders/domain/user/ports/user-query-service';
import { OrderTransactionRepository } from 'src/payments/domain/order/ports/order-transaction.repository';
import { InitiatePaymentRequestDto } from '../../../payments/controllers/dto/initiate-payment-request.dto';
import { InitiatePaymentResponseDto } from '../../../payments/controllers/dto/initiate-payment-response.dto';
import { Result } from '../../../shared/result/result';
import { ResponseCodes } from '../../../shared/response-code';
import { OrderTransaction } from '../../../orders/domain/models/order-transactions.model';
import { TransactionStatus } from '../../../shared/enums/order-status.enum';
import { WompiGateway } from '../../../payments/domain/ports/wompi.gateway';
import { Order } from '../../../orders/domain/models/order.model';
import { WompiResponse } from '../../../payments/controllers/dto/wompi-response.dto';
import { PaymentMethod } from '../../../shared/enums/payment-method.enum';

@Injectable()
export class InitiatePaymentUseCaseImpl implements InitiatePaymentUseCase {
  constructor(
    @Inject('OrderQueryService')
    private readonly orderQuery: OrderQueryService,

    @Inject('UserQueryService')
    private readonly userQuery: UserQueryService,

    @Inject('OrderTransactionRepository')
    private readonly transactionRepo: OrderTransactionRepository,

    @Inject('WompiGateway')
    private readonly wompiService: WompiGateway,
  ) {}

  async execute(
    dto: InitiatePaymentRequestDto,
  ): Promise<Result<InitiatePaymentResponseDto>> {
    const order = await this.orderQuery.findById(dto.orderId);
    if (!order) {
      return Result.fail(
        ResponseCodes.ORDER_NOT_FOUND.code,
        ResponseCodes.ORDER_NOT_FOUND.message,
        ResponseCodes.ORDER_NOT_FOUND.httpStatus,
      );
    }

    const user = await this.userQuery.findById(order.userId);
    if (!user) {
      return Result.fail(
        ResponseCodes.USER_NOT_FOUND.code,
        ResponseCodes.USER_NOT_FOUND.message,
        ResponseCodes.USER_NOT_FOUND.httpStatus,
      );
    }

    const reference = `ORDER-${order.id}-${uuid()}`;

    const transaction = new OrderTransaction(
      null,
      'WOMPI',
      reference,
      TransactionStatus.PENDING,
      order.totalAmount,
      Currency.COP,
      PaymentMethod.CARD,
      order.id!,
      new Date(),
      new Date(),
    );

    const existing = await this.transactionRepo.findOne(
      order.id!,
      TransactionStatus.PENDING,
    );

    if (existing) {
      return Result.fail(
        ResponseCodes.TRANSACTION_EXIST.code,
        ResponseCodes.TRANSACTION_EXIST.message,
        ResponseCodes.TRANSACTION_EXIST.httpStatus,
      );
    }

    await this.transactionRepo.save(transaction);

    await this.processTransactionWompi(dto, reference, order);

    const response = new InitiatePaymentResponseDto();
    response.reference = reference;
    response.amountInCents = order.totalAmount;
    response.currency = Currency.COP;
    response.customerEmail = user.email;
    response.publicKey = process.env.WOMPI_PUBLIC_KEY!;

    return Result.ok(
      response,
      ResponseCodes.TRANSACTION_SUCCESS.code,
      ResponseCodes.TRANSACTION_SUCCESS.message,
      ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
    );
  }

  private async processTransactionWompi(
    request: InitiatePaymentRequestDto,
    reference: string,
    order: Order,
  ): Promise<WompiResponse> {
    const valueIva = order.subtotal * (order.iva / 100);
    const wompiDto = {
      amountInCents: order.totalAmount * 100,
      currency: 'COP',
      reference: reference,
      amountInCentsIva: valueIva,
      customerEmail: request.wompi.customerEmail,
      paymentToken: request.wompi.paymentToken,
      installments: request.wompi.installments,
      redirectUrl: request.wompi.redirectUrl,
    };

    return await this.wompiService.initiateTransaction(wompiDto, reference);
  }
}
