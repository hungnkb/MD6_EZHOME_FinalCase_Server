import { OrderSchema } from 'src/order/order.entity';
import { ReviewSchema } from 'src/reviews/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  _ADMIN = 'admin',
  _USER = 'user',
  _HOST = 'host',
}

@Entity({ name: 'users' })
export class UserSchema {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, unique: true })
  googleEmail: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  active: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole._USER,
  })
  role: UserRole;

  @OneToMany((type) => OrderSchema, (orders) => orders.idOrder)
  @JoinColumn({ name: 'orders', referencedColumnName: 'idOrder' })
  orders: OrderSchema[];

  @OneToMany((type) => ReviewSchema, (reviews) => reviews.idReview)
  @JoinColumn({ name: 'reviews', referencedColumnName: 'idReview' })
  reviews: ReviewSchema[];
}
