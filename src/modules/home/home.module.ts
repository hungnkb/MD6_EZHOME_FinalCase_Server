import { Module } from '@nestjs/common';
import { HomeProvider } from '../../home/provides/home.provider';
import { HomeService } from '../../home/home.service';
import { HomeController } from '../../home/home.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { HomeImageProvider } from '../../home/provides/homeImage.provider';
import { CategoryProvider } from '../../home/provides/category.provider';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/modules/user/user.module';
import { UserProvider } from 'src/user/user.provider';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import {
  CloudinaryService,
  OtherService,
} from 'src/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { CouponService } from 'src/coupon/coupon.service';
import { CouponProvider } from 'src/coupon/coupon.provider';
import { CouponModule } from 'src/coupon/coupon.module';

@Module({
  imports: [DatabaseModule, UserModule, CloudinaryModule, CouponModule],
  providers: [
    ...CategoryProvider,
    ...HomeImageProvider,
    ...HomeProvider,
    ...databaseProviders,
    ...UserProvider,
    ...CloudinaryProvider,
    ...CouponProvider,
    HomeService,
    UserService,
    CloudinaryService,
    OtherService,
    CouponService,
  ],
  controllers: [HomeController],
})
export class HomeModule {}
