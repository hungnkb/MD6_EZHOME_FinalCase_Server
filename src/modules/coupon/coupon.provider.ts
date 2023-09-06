import { DataSource } from 'typeorm';
import { CouponSchema } from 'src/modules/coupon/coupon.entity';

export const CouponProvider = [
  {
    provide: 'COUPON_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CouponSchema),
    inject: ['DATA_SOURCE'],
  },
];
