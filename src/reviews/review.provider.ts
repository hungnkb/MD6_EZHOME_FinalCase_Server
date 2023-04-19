import { DataSource } from 'typeorm';
import {ReviewSchema} from "./review.entity";

export const ReviewProvider = [
    {
        provide: 'REVIEW_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ReviewSchema),
        inject: ['DATA_SOURCE'],
    },
];
