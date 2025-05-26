import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateOrderUseCase } from 'src/orders/application/use-cases/interfaces/create-order.use-case.interface';
import { OrderRequestDto } from './dto/order.request.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { Result } from 'src/shared/result/result';

@ApiTags('Orders')
@Controller('api/orders')
export class OrderController {
  constructor(
    @Inject('CreateOrderUseCase')
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: OrderRequestDto })
  @ApiResponse({
    status: 201,
    description: 'The order was successfully created',
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: user not found or empty order',
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected server error',
  })
  async createOrder(
    @Body() dto: OrderRequestDto,
  ): Promise<Result<OrderResponseDto>> {
    return this.createOrderUseCase.execute(dto);
  }
}
