import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HomeService } from './home.service';
import {
  FilesInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  create(@Body() body: any): Promise<any> {
    console.log(123123, body);

    return this.homeService.create(body);
  }

  @Get()
  findByObj(@Query() query: any): Promise<any> {
    return this.homeService.findByKeyword(query);
  }

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.homeService.uploadImage(files);
  }
}
