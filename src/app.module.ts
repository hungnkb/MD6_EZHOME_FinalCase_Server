import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheckService } from './health-check.service';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { HomeModule } from './modules/home/home.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationService } from './notification/notification.service';
import { NotificationProvider } from './notification/notification.provider';
import { CouponModule } from './coupon/coupon.module';
import { PaypalModule } from './modules/paypal/paypal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register([
      {
        path: 'api/v1/',
        children: [
          {
            path: 'users',
            module: UserModule,
          },
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'homes',
            module: HomeModule,
          },
          {
            path: 'orders',
            module: OrderModule,
          },
          {
            path: 'reviews',
            module: ReviewModule,
          },
          {
            path: 'notifications',
            module: NotificationModule,
          },
          {
            path: 'payments',
            module: PaypalModule,
          },
          {
            path: 'coupons',
            module: CouponModule
          },
        ],
      },
    ]),
    DatabaseModule,
    UserModule,
    AuthModule,
    HomeModule,
    OrderModule,
    CloudinaryModule,
    ReviewModule,
    NotificationModule,
    CouponModule,
    PaypalModule,
  ],
  controllers: [AppController],
  providers: [
    HealthCheckService,
    CloudinaryService,
    NotificationGateway,
    NotificationService,
    ...NotificationProvider,
  ],
})
export class AppModule { }
