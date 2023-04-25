import { DataSource } from 'typeorm';
import { NotificationSchema } from './notification.entity';

export const NotificationProvider = [
  {
    provide: 'NOTIFICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NotificationSchema),
    inject: ['DATA_SOURCE'],
  },
];
