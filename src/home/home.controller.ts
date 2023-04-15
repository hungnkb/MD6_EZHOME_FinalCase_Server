import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HomeService } from './home.service';
import {
  FilesInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  create(@Body() body: any): Promise<any> {
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

  @UseGuards(AuthGuard)
  @Post('status')
  updateStatus(@Body() body: any): Promise<any> {
    return this.homeService.updateStatus(body.idHome, body.status);
  }

}
