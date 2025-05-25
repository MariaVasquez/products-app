import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  addressLine1!: string;

  @Column({ nullable: true })
  addressLine2?: string;

  @Column()
  city!: string;

  @Column()
  region!: string;

  @Column()
  country!: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column()
  isActive!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user!: UserEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}
