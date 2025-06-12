import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-items.entity';
import { OrderStatus } from '../../../../shared/enums/order-status.enum';
import { OrderTransactionEntity } from './order-transactions';

const isTest = process.env.NODE_ENV === 'test';
@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column({
    type: isTest ? 'text' : 'enum',
    enum: isTest ? undefined : OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column({ type: 'int' })
  iva!: number;

  @Column({ type: 'int' })
  subtotal_amount!: number;

  @Column({ type: 'int' })
  total_amount!: number;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItemEntity[];

  @OneToMany(() => OrderTransactionEntity, (tx) => tx.order, {
    cascade: true,
    eager: true,
  })
  transactions!: OrderTransactionEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
