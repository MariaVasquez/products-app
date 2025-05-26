import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InitiatePaymentUseCase } from '../application/use-cases/interfaces/initiate-payment.use-case.interface';
import { InitiatePaymentResponseDto } from './dto/initiate-payment-response.dto';
import { InitiatePaymentRequestDto } from './dto/initiate-payment-request.dto';
import { Result } from 'src/shared/result/result';

@ApiTags('Payments')
@Controller('api/payments')
export class PaymentsController {
  constructor(
    @Inject('InitiatePaymentUseCase')
    private readonly initiatePaymentUseCase: InitiatePaymentUseCase,
  ) {}

  @Post('initiate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Initiate payment for an existing order' })
  @ApiResponse({
    status: 200,
    description: 'Returns payment information required by frontend',
    type: InitiatePaymentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Order or user not found',
  })
  async initiatePayment(
    @Body() dto: InitiatePaymentRequestDto,
  ): Promise<Result<InitiatePaymentResponseDto>> {
    return this.initiatePaymentUseCase.execute(dto);
  }
}
