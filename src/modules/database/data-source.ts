import { ReviewSchema } from 'src/reviews/review.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { OrderSchema } from 'src/order/order.entity';
import { NotificationSchema } from 'src/notification/notification.entity';
import { HomeSchema } from 'src/modules/home/entities/home.entity';
import { HomeImageSchema } from 'src/modules/home/entities/homeImage.entity';
import { CategorySchema } from 'src/modules/home/entities/category.entity';
import { CouponSchema } from 'src/modules/coupon/coupon.entity';
import { UserSchema } from '../user/user.entity';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    UserSchema,
    HomeSchema,
    ReviewSchema,
    HomeImageSchema,
    CategorySchema,
    OrderSchema,
    NotificationSchema,
    CouponSchema,
  ],
  migrations: ['dist/migrations/*.js'],
  logger: 'file',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
