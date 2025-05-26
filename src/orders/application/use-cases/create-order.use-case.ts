import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from './interfaces/create-order.use-case.interface';
import { ProductQueryTypeormAdapter } from 'src/orders/infraestructure/product/typeorm/product-query-typeorm-adapter';
import { OrderRequestDto } from 'src/orders/interfaces/http/dto/order.request.dto';
import { UserQueryTypeormAdapter } from 'src/orders/infraestructure/user/typeorm/user-query-typeorm-adapter';
import { Result } from 'src/shared/result/result';
import { Order } from 'src/orders/domain/entities/order.entity';
import { OrderResponseDto } from 'src/orders/interfaces/http/dto/order-response.dto';
import { ResponseCodes } from 'src/shared/response-code';
import { OrderItem } from 'src/orders/domain/entities/order-items.entity';
import { OrderStatus } from 'src/shared/enums/order-status.enum';
import { OrderRepository } from 'src/orders/domain/repositories/order-repository';
import { OrderItemResponseDto } from 'src/orders/interfaces/http/dto/order-item-response.dto';
import { User } from 'src/users/domain/entities/user.entity';

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

      const { items, totalAmount } = await this.buildOrderItems(orderRequest);

      const order = new Order(
        null,
        user.id!,
        OrderStatus.PENDING,
        totalAmount,
        items,
        [],
      );

      const savedOrder = await this.orderRepo.save(order);

      return Result.ok(
        this.buildResponse(savedOrder),
        ResponseCodes.TRANSACTION_SUCCESS.code,
        ResponseCodes.TRANSACTION_SUCCESS.message,
        ResponseCodes.TRANSACTION_SUCCESS.httpStatus,
      );
    } catch (error) {
      console.error(
        ResponseCodes.UNEXPECTED_ERROR.message,
        'for create order',
        error,
      );
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
    totalAmount: number;
  }> {
    let totalAmount = 0;

    const productIds = orderRequest.items.map((item) => item.productId);
    const products = await this.productRepo.findByIds(productIds);

    const items = products.map((product) => {
      const itemDto = orderRequest.items.find(
        (i) => i.productId === product.id,
      );
      const quantity = itemDto?.quantity ?? 0;
      const subtotal = product.price * quantity;
      console.log('SUBTOTAL', subtotal);
      totalAmount += subtotal;

      return new OrderItem(
        null,
        product.id!,
        product.name,
        quantity,
        product.price,
        subtotal,
      );
    });

    console.log('ITEM', items);

    return { items, totalAmount };
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
