import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
