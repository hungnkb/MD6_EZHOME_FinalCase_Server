import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/order/order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) { }
  @Post()
  create(@Body() body: CreateOrderDto): Promise<any> {
    return this.orderService.create(body);
  }

  // @Get()
  // getOrders(): Promise<any> {
  //     return this.orderService.findAll();
  // }

  @Get()
  getOrderByKeyword(@Query() keyword: string): Promise<any> {
    return this.orderService.findByKeyword(keyword);
  }

  @Patch(':idOrder')
  updateStatus(@Param() param: any, @Query() query: any): Promise<any> {
    return this.orderService.updateOrderStatus(param.idOrder, query.status);
  }

  @UseGuards(AuthGuard)
  @Post('/checkout')
  checkout(@Body() body: any): Promise<any> {
    return this.orderService.checkout(body);
  }

  @Get('total-revenue-of-month')
  getRevenueOfMonth(@Query() query): Promise<any>{
    return this.orderService.getRevenueOfMonth(query);
  }

  @Get('total-revenue-of-year')
  getRevenueOfYear(@Query() query): Promise<any>{
    return this.orderService.getRevenueOfYear(query);
  }
}
