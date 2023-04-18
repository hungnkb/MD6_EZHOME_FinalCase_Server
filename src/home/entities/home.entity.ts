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
import { ReviewSchema } from './review.entity';

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

  @OneToMany(type => HomeImageSchema, homeimages => homeimages.idHome)
  @JoinColumn({ name: 'images', referencedColumnName: 'idHome' })
  images: HomeImageSchema[];

  @OneToMany(type => OrderSchema, orders => orders.idOrder)
  @JoinColumn({ name: 'orders', referencedColumnName: 'idOrder' })
  orders: OrderSchema[];

  @OneToMany(type => ReviewSchema, reviews => reviews.idReview)
  @JoinColumn({ name: 'reviews', referencedColumnName: 'idReview' })
  reviews: ReviewSchema[];

  @ManyToOne(type => UserSchema, users => users.idUser)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  idUser: number;

  @ManyToOne(type => CategorySchema, categories => categories.idCategory)
  @JoinColumn({ name: 'idCategory', referencedColumnName: 'idCategory' })
  idCategory: number;
}
