import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService, OtherService } from './cloudinary.service';

@Module({
  providers: [...CloudinaryProvider, CloudinaryService, OtherService],
  exports: [...CloudinaryProvider, CloudinaryService, OtherService],
})
export class CloudinaryModule {}
