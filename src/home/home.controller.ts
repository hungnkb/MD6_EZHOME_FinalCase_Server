import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
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
    console.log(123123, body);

    return this.homeService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  findByKeyword(@Query() query: any, @Request() req): Promise<any> {
    console.log(query, req)
    return this.homeService.findByKeyword(query);
  }

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.homeService.uploadImage(files);
  }
}
