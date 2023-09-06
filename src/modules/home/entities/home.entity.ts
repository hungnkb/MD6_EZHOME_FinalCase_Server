import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { CategorySchema } from './category.entity';
import { HomeImageSchema } from './homeImage.entity';
import { OrderSchema } from 'src/order/order.entity';
import { ReviewSchema } from 'src/reviews/review.entity';
import { CouponSchema } from 'src/modules/coupon/coupon.entity';
import { UserSchema } from 'src/modules/user/user.entity';

@Entity({ name: 'homes' })
export class HomeSchema extends BaseEntity {
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

  @OneToMany(() => HomeImageSchema, (homeimages) => homeimages.idHome)
  @JoinColumn({ name: 'images', referencedColumnName: 'idHome' })
  images: HomeImageSchema[];

  @OneToMany(() => OrderSchema, (orders) => orders.idHome)
  @JoinColumn({ name: 'orders', referencedColumnName: 'idHome' })
  orders: OrderSchema[];

  @OneToMany(() => ReviewSchema, (reviews) => reviews.idHome)
  @JoinColumn({ name: 'reviews', referencedColumnName: 'idHome' })
  reviews: ReviewSchema[];

  @ManyToOne(() => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  idUser: number;

  @ManyToOne(() => CategorySchema, (categories) => categories.idCategory)
  @JoinColumn({ name: 'idCategory', referencedColumnName: 'idCategory' })
  idCategory: number;

  @ManyToOne(() => CouponSchema, (coupons) => coupons.idCoupon, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCoupon', referencedColumnName: 'idCoupon' })
  idCoupon: number;
}
