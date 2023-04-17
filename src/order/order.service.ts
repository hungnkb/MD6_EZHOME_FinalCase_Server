import { Inject, Injectable } from "@nestjs/common";
import { OrderSchema } from "src/home/entities/order.entity";
import { CreateOrderDto } from "src/order/order.dto";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<OrderSchema>,
    ) {
    }

    async create(body: CreateOrderDto): Promise<Object> {        
        return this.orderRepository.save(body)
    }

    async findAll(): Promise<Object> {
        return this.orderRepository.find({relations: ['idUser', 'idHome']});
    }
}