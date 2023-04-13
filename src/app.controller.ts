import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller()
export class AppController {
  constructor(private readonly appService: HealthCheckService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
