import { Module } from '@nestjs/common/decorators';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { ReviewController } from '../../reviews/review.controller';
import { ReviewService } from '../../reviews/review.service';
import { ReviewProvider } from '../../reviews/review.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewController],
  providers: [...databaseProviders, ...ReviewProvider, ReviewService],
})
export class ReviewModule {}
