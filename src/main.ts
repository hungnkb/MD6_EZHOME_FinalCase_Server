import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT'));
}
bootstrap();
