import { Module } from '@nestjs/common/decorators';
import { DatabaseModule } from 'src/modules/database/database.module';
import { databaseProviders } from 'src/modules/database/database.providers';
import { OrderProvider } from 'src/order/order.provider';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
import { UserModule } from '../user/user.module';
import { HomeModule } from '../home/home.module';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { CouponService } from 'src/modules/coupon/coupon.service';
import { CouponProvider } from 'src/modules/coupon/coupon.provider';
import { HomeProvider } from '../home/provides/home.provider';
import { HomeImageProvider } from '../home/provides/homeImage.provider';
import { HomeService } from '../home/home.service';
import { UserProvider } from '../user/user.provider';
import { UserService } from '../user/user.service';

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
    CouponService,
  ],
})
export class OrderModule {}
