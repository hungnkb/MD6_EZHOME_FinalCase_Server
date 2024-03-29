import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderSchema } from 'src/order/order.entity';
import { CreateOrderDto } from 'src/order/order.dto';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { OrderStatus } from 'src/order/order.entity';
import { HomeService } from 'src/modules/home/home.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderSchema>,
    private homeService: HomeService,
  ) {}

  async create(body: CreateOrderDto): Promise<CreateOrderDto> {
    const checkOrderByOwner = await this.isOrderByOwner(
      body.idHome,
      body.idUser,
    );

    const isHomeAvailable = await this.isHomeAvailableByDate(
      body.idHome,
      body.checkin,
      body.checkout,
    );

    if (checkOrderByOwner && isHomeAvailable) {
      return this.orderRepository.save(body);
    }
    throw new HttpException(
      'You can not book your own home',
      HttpStatus.BAD_REQUEST,
    );
  }

  async isHomeAvailableByDate(idHome: number, checkin: Date, checkout: Date) {
    const method1 = await this.orderRepository
      .createQueryBuilder('orders')
      .where('orders.idHome = :idHome', { idHome })
      .andWhere('orders.status = "ongoing"')
      .andWhere('orders.checkin <= CAST(:checkout as date)', { checkout })
      .andWhere('orders.checkin >= CAST(:checkin as date)', { checkin })
      .getMany();

    const method2 = await this.orderRepository
      .createQueryBuilder('orders')
      .where('orders.idHome = :idHome', { idHome })
      .andWhere('orders.status = "ongoing"')
      .andWhere('orders.checkout >= CAST(:checkin as date)', { checkin })
      .andWhere('orders.checkout <= CAST(:checkout as date)', { checkout })
      .getMany();
    if (method1.length + method2.length > 0) {
      throw new HttpException(
        'Theses dates are not available',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
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

  async findAll(): Promise<Array<OrderSchema>> {
    return this.orderRepository
      .createQueryBuilder('orders')
      .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
      .leftJoinAndSelect('orders.idHome', 'homes.idHome')
      .leftJoin('orders.idUser', 'users.idUser')
      .getMany();
  }

  async findByIdOrder(idOrder: number): Promise<any> {
    return this.orderRepository
      .createQueryBuilder('orders')
      .where({ idOrder })
      .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
      .leftJoinAndSelect('orders.idHome', 'homes.idHome')
      .leftJoin('orders.idUser', 'users.idUser')
      .getOne();
  }

  async findByIdUser(
    idUser: string,
    status: string,
  ): Promise<Array<OrderSchema>> {
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

  async findByIdHome(idHome: number): Promise<Array<OrderSchema>> {
    return this.orderRepository
      .createQueryBuilder('orders')
      .where({ idHome })
      .select(['orders', 'users.idUser.fullName', 'users.idUser.idUser'])
      .leftJoinAndSelect('orders.idHome', 'homes.idHome')
      .leftJoin('orders.idUser', 'users.idUser')
      .getMany();
  }

  async findByKeyword(keyword): Promise<Array<OrderSchema>> {
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
  ): Promise<OrderSchema> {
    const order = await this.orderRepository.findOneByOrFail({ idOrder });
    order.status = OrderStatus._DONE;
    order.charged = order.charged + addCharged;
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(idOrder: number): Promise<any> {
    const order = await this.findByIdOrder(idOrder);
    const now = new Date().toJSON().toString();
    const dateNow = now.substring(8, 10);
    const monthNow = now.substring(5, 7);
    const dateOrder = order.checkin.substring(8, 10);
    const monthOrder = order.checkin.substring(5, 7);
    // @ts-ignore
    if (dateOrder - dateNow < 2 && monthOrder - monthNow < 1) {
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

  async getRevenueOfMonth(query) {
    if (query.month && query.year) {
      return this.orderRepository
        .createQueryBuilder('orders')
        .select('SUM(orders.charged)', 'total_revenue')
        .innerJoin('homes', 'homes', 'orders.home = homes.idHome')
        .where('homes.idUser = :userId', { userId: query.idUser })
        .andWhere(
          'MONTH(orders.checkin) = :month AND MONTH(orders.checkout) = :month AND YEAR(orders.checkin) = :year',
          { month: query.month, year: query.year },
        )
        .getRawOne();
    } else {
      const getMonth = new Date();
      const currentMonth = getMonth.getMonth() + 1;
      const getYear = new Date().getFullYear();
      return this.orderRepository
        .createQueryBuilder('orders')
        .select('SUM(orders.charged)', 'total_revenue')
        .innerJoin('homes', 'homes', 'orders.home = homes.idHome')
        .where('homes.idUser = :userId', { userId: query.idUser })
        .andWhere(
          'MONTH(orders.checkin) = :month AND MONTH(orders.checkout) = :month AND YEAR(orders.checkin) = :year',
          { month: currentMonth, year: getYear },
        )
        .getRawOne();
    }
  }

  async getRevenueOfYear(query) {
    if (query.year) {
      return this.orderRepository
        .createQueryBuilder('orders')
        .select('SUM(orders.charged)', 'total_revenue')
        .innerJoin('homes', 'homes', 'orders.home = homes.idHome')
        .where('homes.idUser = :userId', { userId: query.idUser })
        .andWhere(
          'YEAR(orders.checkout) = :year AND YEAR(orders.checkin) = :year',
          { year: query.year },
        )
        .getRawOne();
    } else {
      const getYear = new Date().getFullYear();
      return this.orderRepository
        .createQueryBuilder('orders')
        .select('SUM(orders.charged)', 'total_revenue')
        .innerJoin('homes', 'homes', 'orders.home = homes.idHome')
        .where('homes.idUser = :userId', { userId: query.idUser })
        .andWhere(
          'YEAR(orders.checkout) = :year AND YEAR(orders.checkin) = :year',
          { year: getYear },
        )
        .getRawOne();
    }
  }
}
