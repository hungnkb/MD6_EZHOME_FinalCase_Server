import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { DatabaseModule } from "../database/database.module";
import { CouponProvider } from './coupon.provider';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CouponController],
  providers: [...CouponProvider, ...databaseProviders],
})
export class CouponModule {}
