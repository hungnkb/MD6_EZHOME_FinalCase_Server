import {
  Query,
  Get,
  Post,
  Body,
  Controller,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body) {
    return this.notificationService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  getByIdUser(@Query() query: any) {
    return this.notificationService.findByIdUser(query);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Query() query: any) {
    return this.notificationService.updateStatus(query);
  }
}
