import { Inject, Injectable } from '@nestjs/common';
import { Currency } from 'src/shared/enums/currency.enum';
import { v4 as uuid } from 'uuid';
import { InitiatePaymentUseCase } from './interfaces/initiate-payment.use-case.interface';
import { OrderQueryService } from 'src/payments/domain/order/ports/order-query-service';
import { UserQueryService } from 'src/orders/domain/user/ports/user-query-service';
import { OrderTransactionRepository } from 'src/payments/domain/order/ports/order-transaction.repository';
import { InitiatePaymentRequestDto } from 'src/payments/controllers/dto/initiate-payment-request.dto';
import { InitiatePaymentResponseDto } from 'src/payments/controllers/dto/initiate-payment-response.dto';
import { Result } from 'src/shared/result/result';
import { ResponseCodes } from 'src/shared/response-code';
import { OrderTransaction } from 'src/orders/domain/models/order-transactions.model';
import { TransactionStatus } from 'src/shared/enums/order-status.enum';

@Injectable()
export class InitiatePaymentUseCaseImpl implements InitiatePaymentUseCase {
  constructor(
    @Inject('OrderQueryService')
    private readonly orderQuery: OrderQueryService,

    @Inject('UserQueryService')
    private readonly userQuery: UserQueryService,

    @Inject('OrderTransactionRepository')
    private readonly transactionRepo: OrderTransactionRepository,
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
      dto.paymentMethod,
      order.id!,
      new Date(),
      new Date(),
    );

    await this.transactionRepo.save(transaction);

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
}
