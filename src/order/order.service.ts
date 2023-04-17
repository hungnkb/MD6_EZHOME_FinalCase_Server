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
        return this.orderRepository.find({
            relations: ['idUser', 'idHome'],
            loadRelationIds: true,
        });
    }

    async findByIdOrder(idOrder: number): Promise<any> {
        return this.orderRepository.findOneOrFail({
            relations: ['idUser', 'idHome'],
            loadRelationIds: true,
            where: {
                idOrder
            }
        });
    }

    async findByIdUser(idUser: number): Promise<Object> {
        return this.orderRepository.find({
            relations: ['idUser', 'idHome'],
            loadRelationIds: true,
            where: {
                idUser
            }
        })
    }

    async findByIdHome(idHome: number): Promise<Object> {
        return this.orderRepository.find({
            relations: ['idUser', 'idHome'],
            loadRelationIds: true,
            where: {
                idHome
            }
        })
    }

    async findByKeyword(keyword): Promise<Object> {
        if (keyword.idOrder) {
            return this.findByIdOrder(keyword.idOrder);
        } else if (keyword.idUser) {
            return this.findByIdUser(keyword.idUser);
        } else if (keyword.idHome) {
            return this.findByIdHome(keyword.idHome);
        } 
        return this.findAll();
    }

    async updateOrderStatus(idOrder: number, newStatus: string): Promise<any> {
        let order = await this.findByIdOrder(idOrder);
        order.status = newStatus;
        await this.orderRepository.save(order);
        return
    }
}