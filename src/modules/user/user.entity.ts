import { NotificationSchema } from 'src/notification/notification.entity';
import { OrderSchema } from 'src/order/order.entity';
import { ReviewSchema } from 'src/reviews/review.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CouponSchema } from '../coupon/coupon.entity';

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

  @OneToMany(() => OrderSchema, (orders) => orders.idOrder)
  @JoinColumn({ name: 'orders', referencedColumnName: 'idOrder' })
  orders: OrderSchema[];

  @OneToMany(() => ReviewSchema, (reviews) => reviews.idReview)
  @JoinColumn({ name: 'reviews', referencedColumnName: 'idReview' })
  reviews: ReviewSchema[];

  @OneToMany(
    () => NotificationSchema,
    (notifications) => notifications.idNotification,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'notifications', referencedColumnName: 'idNotification' })
  notifications: NotificationSchema[];

  @OneToMany(() => CouponSchema, (coupons) => coupons.idCoupon, {
    cascade: true,
  })
  @JoinColumn({ name: 'coupons', referencedColumnName: 'idCoupon' })
  coupons: CouponSchema[];
}
