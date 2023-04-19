import { DataSource } from 'typeorm';
import { OrderSchema } from 'src/order/order.entity';

export const OrderProvider = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderSchema),
    inject: ['DATA_SOURCE'],
  },
];
