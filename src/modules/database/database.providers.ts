import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { ReviewSchema } from 'src/reviews/review.entity';
import { OrderSchema } from 'src/order/order.entity';
import { NotificationSchema } from 'src/notification/notification.entity';
import { HomeSchema } from 'src/modules/home/entities/home.entity';
import { HomeImageSchema } from 'src/modules/home/entities/homeImage.entity';
import { CategorySchema } from 'src/modules/home/entities/category.entity';
import { CouponSchema } from 'src/modules/coupon/coupon.entity';
import { UserSchema } from '../user/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          ReviewSchema,
          UserSchema,
          HomeSchema,
          HomeImageSchema,
          CategorySchema,
          OrderSchema,
          NotificationSchema,
          CouponSchema,
        ],
        synchronize: false,
        migrations: ['dist/migrations/*.js'],
      });
      return dataSource.initialize();
    },
  },
];
