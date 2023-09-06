import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: any): Promise<any> {
    return this.homeService.create(body);
  }

  @Get()
  findByKeyword(@Query() query: any): Promise<any> {
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

  @Get('revenue')
  getrevenue(@Query() query: string): Promise<any> {
    return this.homeService.getrevenue(query);
  }

  @Get('top')
  getTop(): Promise<any> {
    return this.homeService.getTop();
  }

  @Patch()
  patchHome(@Body() body: any): Promise<any> {
    return this.homeService.patch(body);
  }
}
