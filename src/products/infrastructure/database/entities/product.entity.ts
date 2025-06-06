import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductImageEntity } from './product-images.entity';
import { ProductColor } from '../../../../products/domain/model/product-color.model';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int' })
  price!: number;

  @Column({ length: 5 })
  currency!: string;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => ProductImageEntity, (img) => img.product, {
    cascade: true,
    eager: true,
  })
  images!: ProductImageEntity[];

  @Column({ type: 'json', nullable: true })
  colors?: ProductColor;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
