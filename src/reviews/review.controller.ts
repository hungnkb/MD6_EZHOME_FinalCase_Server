import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private orderService: ReviewService) {}
  @Post()
  create(@Body() body: ReviewService): Promise<any> {
    return this.orderService.create(body);
  }

  @Get()
  findByKeyword(@Query() query: any, @Request() req): Promise<any> {
    return this.orderService.findByKeyword(query);
  }
}
