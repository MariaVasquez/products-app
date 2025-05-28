import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTransaction } from '../../../../orders/domain/models/order-transactions.model';
import { OrderTransactionEntity } from '../../../../orders/infraestructure/database/entities/order-transactions';
import { OrderTransactionRepository } from '../../../../payments/domain/order/ports/order-transaction.repository';
import { TransactionStatus } from '../../../../shared/enums/order-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTransactionTypeormAdapter
  implements OrderTransactionRepository
{
  constructor(
    @InjectRepository(OrderTransactionEntity)
    private readonly repo: Repository<OrderTransactionEntity>,
  ) {}
  async findOne(
    orderId: number,
    status: string,
  ): Promise<OrderTransaction | null> {
    const entity = await this.repo.findOne({
      where: {
        order: { id: orderId },
        status: status as TransactionStatus,
      },
    });

    return entity
      ? new OrderTransaction(
          entity.id,
          entity.provider,
          entity.external_id,
          entity.status,
          entity.amount,
          entity.currency,
          entity.payment_method,
          entity.order.id,
          entity.createdAt,
          entity.updatedAt,
        )
      : null;
  }

  async save(transaction: OrderTransaction): Promise<OrderTransaction> {
    const entity = this.repo.create({
      provider: transaction.provider,
      external_id: transaction.externalId,
      status: transaction.status,
      amount: transaction.amount,
      currency: transaction.currency,
      payment_method: transaction.paymentMethod,
      order: { id: transaction.orderId },
    });

    const saved = await this.repo.save(entity);

    return new OrderTransaction(
      saved.id,
      saved.provider,
      saved.external_id,
      saved.status,
      saved.amount,
      saved.currency,
      saved.payment_method,
      saved.order.id,
      saved.createdAt,
      saved.updatedAt,
    );
  }

  async findByReference(reference: string): Promise<OrderTransaction | null> {
    const entity = await this.repo.findOne({
      where: { external_id: reference },
      relations: ['order'],
    });

    if (!entity) return null;

    return new OrderTransaction(
      entity.id,
      entity.provider,
      entity.external_id,
      entity.status,
      entity.amount,
      entity.currency,
      entity.payment_method,
      entity.order.id,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
