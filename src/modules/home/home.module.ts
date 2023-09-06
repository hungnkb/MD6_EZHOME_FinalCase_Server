import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { databaseProviders } from 'src/modules/database/database.providers';
import { UserModule } from 'src/modules/user/user.module';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import {
  CloudinaryService,
  OtherService,
} from 'src/modules/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/modules/cloudinary/cloudinary.provider';
import { CouponService } from 'src/modules/coupon/coupon.service';
import { CouponProvider } from 'src/modules/coupon/coupon.provider';
import { CouponModule } from 'src/modules/coupon/coupon.module';
import { CategoryProvider } from './provides/category.provider';
import { HomeImageProvider } from './provides/homeImage.provider';
import { HomeProvider } from './provides/home.provider';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { UserProvider } from '../user/user.provider';
import { UserService } from '../user/user.service';

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
