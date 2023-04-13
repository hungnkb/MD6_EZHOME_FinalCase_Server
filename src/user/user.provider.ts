import { DataSource } from 'typeorm';
import { UserSchema } from './user.entity';

export const UserProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserSchema),
    inject: ['DATA_SOURCE'],
  },
];
