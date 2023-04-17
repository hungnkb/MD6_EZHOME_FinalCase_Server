import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/order/order.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) { }

    @Post()
    create(@Body() body: CreateOrderDto): Promise<any> {
        return this.orderService.create(body);
    }

    @Get()
    getOrders(): Promise<any> {
        return this.orderService.findAll();
    }

    @Patch()
    updateStatus(): Promise<any> {
        return
    }
}
