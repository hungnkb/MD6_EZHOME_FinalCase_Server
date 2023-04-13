import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }
}

// Upload a file:
// import { Injectable, BadRequestException } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary/cloudinary.service';

// @Injectable()
// export class OtherService {
//   constructor(private cloudinary: CloudinaryService) {}

//   async uploadImageToCloudinary(file: Express.Multer.File) {
//     return await this.cloudinary.uploadImage(file).catch(() => {
//       throw new BadRequestException('Invalid file type.');
//     });
//   }
// }
