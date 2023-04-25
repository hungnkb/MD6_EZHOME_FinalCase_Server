import { Query, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() body) {
    return this.notificationService.create(body);
  }

  @Get()
  getByIdUser(@Query() query) {
    return this.notificationService.findByIdUser(query);
  }
}
