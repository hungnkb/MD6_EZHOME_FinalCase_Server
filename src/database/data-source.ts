import { ConfigService } from "@nestjs/config";
import { CategorySchema } from "src/home/entities/category.entity";
import { HomeSchema } from "src/home/entities/home.entity";
import { HomeImageSchema } from "src/home/entities/homeImage.entity";
import { ReviewSchema } from "src/home/entities/review.entity";
import { UserSchema } from "src/user/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'ezhome',
    entities: [
        UserSchema,
        HomeSchema,
        ReviewSchema,
        HomeImageSchema,
        CategorySchema,
        ReviewSchema,
    ],
    migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
