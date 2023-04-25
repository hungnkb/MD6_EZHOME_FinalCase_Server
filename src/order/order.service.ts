import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderSchema } from 'src/order/order.entity';
import { CreateOrderDto } from 'src/order/order.dto';
import { Repository } from 'typeorm';
import { HomeService } from 'src/home/home.service';
import { plainToClass, classToPlain } from 'class-transformer';
import { OrderStatus } from 'src/order/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderSchema>,
    private homeService: HomeService,
  ) {}

  async create(body: CreateOrderDto): Promise<Object> {
    const checkOrderByOwner = await this.isOrderByOwner(
      body.idHome,
      body.idUser,
    );

    if (checkOrderByOwner) {
      return this.orderRepository.save(body);
    }
    throw new HttpException(
      'You can not book your own home',
      HttpStatus.BAD_REQUEST,
    );
  }

  async isOrderByOwner(idHome: number, idUser: number) {
    const home = await this.homeService.findByIdHome(idHome);
    const owner = home[0].idUser;
    const classOwner = classToPlain(owner);
    const idOwner = classOwner.idUser;

    if (idOwner === idUser) {
      return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return idOwner;
  }

  async findAll(): Promise<Object> {
    // return this.orderRepository.find({
    //     relations: ['idUser', 'idHome'],
    //     loadRelationIds: true,
    // });
    return this.orderRepository
      .createQueryBuilder('orders')
      .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
      .leftJoinAndSelect('orders.idHome', 'homes.idHome')
      .leftJoin('orders.idUser', 'users.idUser')
      .getMany();
  }

  async findByIdOrder(idOrder: number): Promise<any> {
    // return this.orderRepository.findOneOrFail({
    //     relations: ['users', 'homes'],
    //     loadRelationIds: true,
    //     where: {
    //         idOrder
    //     },
    // });
    return this.orderRepository
      .createQueryBuilder('orders')
      .where({ idOrder })
      .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
      .leftJoinAndSelect('orders.idHome', 'homes.idHome')
      .leftJoin('orders.idUser', 'users.idUser')
      .getOne();
  }

  async findByIdUser(idUser: string, status: string): Promise<Object> {
    if (status) {
      return this.orderRepository
        .createQueryBuilder('orders')
        .where({ idUser })
        .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
        .leftJoinAndSelect('orders.idHome', 'homes.idHome')
        .leftJoin('orders.idUser', 'users.idUser')
        .andWhere('orders.status = :status', { status: `${status}` })
        .getMany();
    } else {
      return this.orderRepository
        .createQueryBuilder('orders')
        .where({ idUser })
        .select([
          'orders',
          'users.idUser.fullName',
          'users.idUser.idUser',
          'owner.idUser',
        ])
        .leftJoinAndSelect('orders.idHome', 'homes')
        .leftJoin('orders.idUser', 'users.idUser')
        .innerJoin('homes.idUser', 'owner')
        .getMany();
    }
  }

  async findByIdHome(idHome: number): Promise<Object> {
    // return this.orderRepository.find({
    //     relations: ['idUser', 'idHome'],
    //     loadRelationIds: true,
    //     where: {
    //         idHome
    //     }
    // })
    return this.orderRepository
      .createQueryBuilder('orders')
      .where({ idHome })
      .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
      .leftJoinAndSelect('orders.idHome', 'homes.idHome')
      .leftJoin('orders.idUser', 'users.idUser')
      .getMany();
  }

  async findByKeyword(keyword): Promise<Object> {
    if (keyword.idOrder) {
      return this.findByIdOrder(keyword.idOrder);
    } else if (keyword.idUser) {
      return this.findByIdUser(keyword.idUser, keyword.status);
    } else if (keyword.idHome) {
      return this.findByIdHome(keyword.idHome);
    }
    return this.findAll();
  }

  async updateOrderCharge(
    idOrder: number,
    addCharged: number,
  ): Promise<Object> {
    const order = await this.orderRepository.findOneByOrFail({ idOrder });
    order.status = OrderStatus._DONE;
    order.charged = order.charged + addCharged;
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(idOrder: number, newStatus: string): Promise<any> {
    let order = await this.findByIdOrder(idOrder);
    const now = new Date().toJSON().toString();
    const dateNow = now.substring(8, 10);
    const dateOrder = order.checkin.substring(8, 10);
    // @ts-ignore
    if (dateOrder - dateNow < 2) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    } else {
      order.status = 'cancelled';
      await this.orderRepository.save(order);
      throw new HttpException('Change Status Success', HttpStatus.OK);
    }
  }

  async checkout(body: any): Promise<any> {
    const idOrder = body.order.idOrder;
    const addCharged = body.addCharge;
    return this.updateOrderCharge(idOrder, addCharged);
  }
}
