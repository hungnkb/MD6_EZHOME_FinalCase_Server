import { DataSource } from 'typeorm';
import { HomeImageSchema } from '../entities/homeImage.entity';

export const HomeImageProvider = [
  {
    provide: 'HOMEIMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HomeImageSchema),
    inject: ['DATA_SOURCE'],
  },
];
