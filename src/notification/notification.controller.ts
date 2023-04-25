import { Query, Get, Post, Body, Controller, Put, Patch, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body) {
    return this.notificationService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  getByIdUser(@Query() query) {
    return this.notificationService.findByIdUser(query);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Query() query) {
    return this.notificationService.updateStatus(query)
  }
  
}
