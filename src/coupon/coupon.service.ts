import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CouponSchema } from "./coupon.entity";
import { CreateCouponDto } from "./coupon.dto";
import { Repository } from 'typeorm';
import { HomeService } from 'src/home/home.service';
import { plainToClass, classToPlain } from 'class-transformer';
import { OrderSchema } from "../order/order.entity";
import { log } from 'console';
import { promises } from 'dns';

@Injectable()
export class CouponService {
  constructor(
    @Inject('COUPON_REPOSITORY')
    private couponRepository: Repository<CouponSchema>,
    // private homeService: HomeService,
  ) { }

  async create(body: CreateCouponDto): Promise<Object> {
    return this.couponRepository.save(body);

  }
  async findByKeyword(keyword): Promise<Object> {
    if (keyword.idCoupon) {
      return this.findByIdCoupon(keyword.idCoupon);
    } else if (keyword.idUser) {
      return this.findByIdUser(keyword.idUser);
    }
    return this.findAll();
  }
  async findAll() {
    return this.couponRepository
      .createQueryBuilder('coupons')
      .select([
        'coupons',
        'users.idUser',
        'users.email',
        'users.image',
      ])
      .leftJoin('coupons.user', 'users')
      .orderBy('coupons.idCoupon', 'DESC')
      .getMany();
  }

  async findByIdUser(idUser: number): Promise<Object> {
    return this.couponRepository
      .createQueryBuilder('coupons')
      .where({ user: idUser })
      .select([
        'coupons',
        'users.email',
        'users.image',
        'users.idUser'
      ])
      .leftJoin('coupons.user', 'users')
      .orderBy('coupons.idCoupon', 'DESC')
      .getMany();
  }

  async findByIdCoupon(idCoupon: number): Promise<any> {
    return this.couponRepository
      .createQueryBuilder('coupons')
      .where({ idCoupon })
      .select([
        'coupons',
        'users.email',
        'users.image',
        'users.idUser',
      ])
      .leftJoin('coupons.user', 'users')
      .getOne();
  }


  async remove(query: any): Promise<any> {    
    return this.couponRepository.update({ idCoupon: query.idCoupon }, { isDeleted: true })
  }

  async update(body: any): Promise<any> {
    return this.couponRepository.save(body)
  }
}

