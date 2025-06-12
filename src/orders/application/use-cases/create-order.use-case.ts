import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from './interfaces/create-order.use-case.interface';
import { ProductQueryTypeormAdapter } from '../../../orders/infraestructure/product/typeorm/product-query-typeorm-adapter';
import { OrderRequestDto } from '../../../orders/interfaces/dto/order.request.dto';
import { UserQueryTypeormAdapter } from '../../../orders/infraestructure/user/typeorm/user-query-typeorm-adapter';
import { Result } from '../../../shared/result/result';
import { Order } from '../../../orders/domain/models/order.model';
import { OrderResponseDto } from '../../../orders/interfaces/dto/order-response.dto';
import { ResponseCodes } from '../../../shared/response-code';
import { OrderItem } from '../../../orders/domain/models/order-items.model';
import { OrderStatus } from '../../../shared/enums/order-status.enum';
import { OrderRepository } from 'src/orders/domain/repositories/order-repository';
import { OrderItemResponseDto } from '../../../orders/interfaces/dto/order-item-response.dto';
import { User } from '../../../users/domain/models/user.model';

@Injectable()
export class CreateOrderUseCaseImpl implements CreateOrderUseCase {
  constructor(
    @Inject('ProductQueryService')
    private readonly productRepo: ProductQueryTypeormAdapter,
    @Inject('UserQueryService')
    private readonly userRepo: UserQueryTypeormAdapter,
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepository,
  ) {}
  async execute(
    orderRequest: OrderRequestDto,
  ): Promise<Result<OrderResponseDto>> {
    try {
      const user = await this.validateUser(orderRequest.userId);
      if (!user) return this.failUserNotFound();

      if (orderRequest.items.length === 0) return this.failEmptyOrder();

      const orderPending = await this.orderRepo.findOrderByUser(
        orderRequest.userId,
      );

      if (orderPending) return this.failOrderPending();

      const { items, subtotalAmount, totalAmount } =
        await this.buildOrderItems(orderRequest);

      const order = new Order(
        null,
        user.id!,
        OrderStatus.PENDING,
        19,
        subtotalAmount,
        totalAmount,
        items,
        [],
      );

      console.log(order);

      const savedOrder = await this.orderRepo.save(order);

      return Result.ok(
        this.buildResponse(savedOrder),
        ResponseCodes.TRANSACTION_SUCCESS.code,
        ResponseCodes.TRANSACTION_SUCCESS.message,
        ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
      );
    } catch {
      return Result.fail(
        ResponseCodes.UNEXPECTED_ERROR.code,
        ResponseCodes.UNEXPECTED_ERROR.message,
        ResponseCodes.UNEXPECTED_ERROR.httpStatus,
        [],
      );
    }
  }

  private async validateUser(userId: number): Promise<User | null> {
    return await this.userRepo.findById(userId);
  }

  private failUserNotFound(): Result<OrderResponseDto> {
    return Result.fail(
      ResponseCodes.USER_NOT_FOUND.code,
      ResponseCodes.USER_NOT_FOUND.message,
      ResponseCodes.USER_NOT_FOUND.httpStatus,
      [],
    );
  }

  private failOrderPending(): Result<OrderResponseDto> {
    return Result.fail(
      ResponseCodes.ORDER_PENDING_EXIST.code,
      ResponseCodes.ORDER_PENDING_EXIST.message,
      ResponseCodes.ORDER_PENDING_EXIST.httpStatus,
      [],
    );
  }

  private failEmptyOrder(): Result<OrderResponseDto> {
    return Result.fail(
      ResponseCodes.ORDER_NO_ITEMS.code,
      ResponseCodes.ORDER_NO_ITEMS.message,
      ResponseCodes.ORDER_NO_ITEMS.httpStatus,
      [],
    );
  }

  private async buildOrderItems(orderRequest: OrderRequestDto): Promise<{
    items: OrderItem[];
    subtotalAmount: number;
    totalAmount: number;
  }> {
    let subtotalAmount = 0;

    const productIds = orderRequest.items.map((item) => item.productId);
    const products = await this.productRepo.findByIds(productIds);

    const items = products.map((product) => {
      const itemDto = orderRequest.items.find(
        (i) => i.productId === product.id,
      );
      const quantity = itemDto?.quantity ?? 0;
      const subtotal = product.price * quantity;
      subtotalAmount += subtotal;

      return new OrderItem(
        null,
        product.id!,
        product.name,
        quantity,
        product.price,
        subtotal,
      );
    });

    const calculateIva = subtotalAmount * 0.19;

    const totalAmount = calculateIva + subtotalAmount;

    return { items, subtotalAmount, totalAmount };
  }

  private buildResponse(order: Order): OrderResponseDto {
    const res = new OrderResponseDto();
    res.id = order.id!;
    res.userId = order.userId;
    res.status = order.status;
    res.totalAmount = order.totalAmount;
    res.createdAt = order.createdAt!;
    res.updatedAt = order.updatedAt!;
    res.items = order.items.map((i) => {
      const dto = new OrderItemResponseDto();
      dto.id = i.id!;
      dto.productName = i.productName;
      dto.quantity = i.quantity;
      dto.unitPrice = i.unitPrice;
      dto.subtotal = i.subtotal;
      return dto;
    });
    return res;
  }
}
