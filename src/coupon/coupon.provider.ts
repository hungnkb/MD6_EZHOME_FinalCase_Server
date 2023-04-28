import { DataSource } from 'typeorm';
import { CouponSchema } from 'src/coupon/coupon.entity';

export const CouponProvider = [
  {
    provide: 'COUPON_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CouponSchema),
    inject: ['DATA_SOURCE'],
  },
];
