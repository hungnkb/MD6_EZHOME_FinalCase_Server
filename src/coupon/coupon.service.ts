import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CouponSchema } from "./coupon.entity";
import { CreateCouponDto } from "./coupon.dto";
import { Repository } from 'typeorm';
import { HomeService } from 'src/home/home.service';
import { plainToClass, classToPlain } from 'class-transformer';
import { OrderSchema } from "../order/order.entity";

@Injectable()
export class CouponService{
  constructor(
    @Inject('COUPON_REPOSITORY')
    private couponRepository: Repository<CouponSchema>,
    // private homeService: HomeService,
  ) {}

  async create(body: CreateCouponDto): Promise<Object>{
    return this.couponRepository.save(body)
  }
}