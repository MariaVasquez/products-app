import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { TransactionStatus } from 'src/shared/enums/order-status.enum';

@Entity({ name: 'order_transactions' })
export class OrderTransactionEntity {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @ManyToOne(() => OrdersEntity, (order) => order.transactions, {
    onDelete: 'CASCADE',
  })
  order!: OrdersEntity;

  @Column({ length: 100 })
  provider!: string;

  @Column({ type: 'varchar', length: 255 })
  external_id!: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status!: TransactionStatus;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'varchar', length: 50 })
  currency!: string;

  @Column({ type: 'varchar', length: 50 })
  payment_method!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
