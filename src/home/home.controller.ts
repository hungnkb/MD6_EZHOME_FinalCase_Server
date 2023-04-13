import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HomeService } from './home.service';

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
}
