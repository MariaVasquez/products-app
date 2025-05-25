import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  typeDocument!: string;

  @Column()
  documentNumber!: string;

  @Column()
  email!: string;

  @OneToMany(() => AddressEntity, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  addresses!: AddressEntity[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}
