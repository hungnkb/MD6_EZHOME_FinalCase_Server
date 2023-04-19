import { CategorySchema } from "src/home/entities/category.entity";
import { HomeSchema } from "src/home/entities/home.entity";
import { HomeImageSchema } from "src/home/entities/homeImage.entity";
import { ReviewSchema } from "src/reviews/review.entity";
import { UserSchema } from "src/user/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import * as process from 'process';
import { OrderSchema } from "src/order/order.entity";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        UserSchema,
        HomeSchema,
        ReviewSchema,
        HomeImageSchema,
        CategorySchema,
        OrderSchema
    ],
    migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
