import { UserSchema } from 'src/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategorySchema } from './category.entity';
import { HomeImageSchema } from './homeImage.entity';
import { OrderSchema } from '../../order/order.entity';
import { ReviewSchema } from '../../reviews/review.entity';
import { CouponSchema } from '../../coupon/coupon.entity';

@Entity({ name: 'homes' })
export class HomeSchema {
  @PrimaryGeneratedColumn()
  idHome: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  bathrooms: number;

  @Column({ nullable: false })
  bedrooms: number;

  @Column({ nullable: true, type: 'longtext' })
  description: string;

  @Column({ nullable: true })
  rate_stars: number;

  @Column({ default: true })
  status: boolean;

  @OneToMany((type) => HomeImageSchema, (homeimages) => homeimages.idHome)
  @JoinColumn({ name: 'images', referencedColumnName: 'idHome' })
  images: HomeImageSchema[];

  @OneToMany((type) => OrderSchema, (orders) => orders.idHome)
  @JoinColumn({ name: 'orders', referencedColumnName: 'idHome' })
  orders: OrderSchema[];

  @OneToMany((type) => ReviewSchema, (reviews) => reviews.idHome)
  @JoinColumn({ name: 'reviews', referencedColumnName: 'idHome' })
  reviews: ReviewSchema[];

  @ManyToOne((type) => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  idUser: number;

  @ManyToOne((type) => CategorySchema, (categories) => categories.idCategory)
  @JoinColumn({ name: 'idCategory', referencedColumnName: 'idCategory' })
  idCategory: number;

  @ManyToOne((type) => CouponSchema,(coupons => coupons.idCoupon), { onDelete: 'CASCADE'})
  @JoinColumn({name: 'idCoupon', referencedColumnName: 'idCoupon'})
  idCoupon: number
}
