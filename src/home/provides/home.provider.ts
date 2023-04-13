import { DataSource } from 'typeorm';
import { HomeSchema } from '../entities/home.entity';

export const HomeProvider = [
  {
    provide: 'HOME_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HomeSchema),
    inject: ['DATA_SOURCE'],
  },
];
