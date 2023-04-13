import { DataSource } from 'typeorm';
import { CategorySchema } from '../entities/category.entity';

export const CategoryProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategorySchema),
    inject: ['DATA_SOURCE'],
  },
];
