import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => OrdersEntity, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order!: OrdersEntity;

  @Column()
  product_id!: number;

  @Column({ type: 'varchar', length: 255 })
  product_name!: string;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'int' })
  unit_price!: number;

  @Column({ type: 'int' })
  subtotal!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
