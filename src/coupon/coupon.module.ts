import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { DatabaseModule } from "../database/database.module";
import { CouponProvider } from './coupon.provider';
import { databaseProviders } from 'src/database/database.providers';
import { CouponService } from "./coupon.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CouponController],
  providers: [CouponService,...CouponProvider, ...databaseProviders],
})
export class CouponModule {}