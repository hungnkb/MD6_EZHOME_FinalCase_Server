import { ConfigService } from '@nestjs/config';
import { CategorySchema } from 'src/home/entities/category.entity';
import { HomeSchema } from 'src/home/entities/home.entity';
import { HomeImageSchema } from 'src/home/entities/homeImage.entity';
import { UserSchema } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { ReviewSchema } from 'src/home/entities/review.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          UserSchema,
          HomeSchema,
          HomeImageSchema,
          CategorySchema,
          ReviewSchema,
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
