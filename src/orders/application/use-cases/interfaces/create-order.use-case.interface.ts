import { OrderResponseDto } from 'src/orders/interfaces/dto/order-response.dto';
import { OrderRequestDto } from 'src/orders/interfaces/dto/order.request.dto';
import { Result } from 'src/shared/result/result';

export interface CreateOrderUseCase {
  execute(orderRequest: OrderRequestDto): Promise<Result<OrderResponseDto>>;
}
