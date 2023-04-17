import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
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

    // @Get()
    // getOrders(): Promise<any> {
    //     return this.orderService.findAll();
    // }

    @Get()
    getOrderByKeyword(@Query() keyword: string): Promise<any> {
        return this.orderService.findByKeyword(keyword);
    }

    @Patch(':idOrder')
    updateStatus(@Param() param, @Query() query): Promise < any > {
        return this.orderService.updateOrderStatus(param.idOrder, query.status)
    }
}
