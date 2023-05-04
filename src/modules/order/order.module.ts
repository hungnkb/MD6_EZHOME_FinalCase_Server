import { Module } from '@nestjs/common/decorators';
import { UserController } from '../../user/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { OrderProvider } from 'src/order/order.provider';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
import { HomeService } from 'src/home/home.service';
import { HomeProvider } from 'src/home/provides/home.provider';
import { HomeImageProvider } from 'src/home/provides/homeImage.provider';
import { UserModule } from '../user/user.module';
import { HomeModule } from '../home/home.module';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserProvider } from 'src/user/user.provider';
import { CouponService } from 'src/coupon/coupon.service';
import { CouponProvider } from 'src/coupon/coupon.provider';

@Module({
  imports: [DatabaseModule, UserModule, HomeModule],
  controllers: [OrderController],
  providers: [
    ...databaseProviders,
    ...OrderProvider,
    ...HomeProvider,
    ...HomeImageProvider,
    ...UserProvider,
    ...CouponProvider,
    UserService,
    OrderService,
    HomeService,
    CloudinaryService,
    CouponService
  ],
})
export class OrderModule {}
