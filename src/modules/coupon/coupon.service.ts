import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CouponSchema } from './coupon.entity';
import { CreateCouponDto } from './coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @Inject('COUPON_REPOSITORY')
    private couponRepository: Repository<CouponSchema>, // private homeService: HomeService,
  ) {}

  async create(body: CreateCouponDto): Promise<CouponSchema> {
    return this.couponRepository.save(body);
  }
  async findByKeyword(keyword): Promise<Array<CouponSchema>> {
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
      .select(['coupons', 'users.idUser', 'users.email', 'users.image'])
      .leftJoin('coupons.user', 'users')
      .orderBy('coupons.idCoupon', 'DESC')
      .getMany();
  }

  async findByIdUser(idUser: number): Promise<Array<CouponSchema>> {
    return this.couponRepository
      .createQueryBuilder('coupons')
      .where({ user: idUser })
      .select(['coupons', 'users.email', 'users.image', 'users.idUser'])
      .leftJoin('coupons.user', 'users')
      .orderBy('coupons.idCoupon', 'DESC')
      .getMany();
  }

  async findByIdCoupon(idCoupon: number): Promise<any> {
    return this.couponRepository
      .createQueryBuilder('coupons')
      .where({ idCoupon })
      .select(['coupons', 'users.email', 'users.image', 'users.idUser'])
      .leftJoin('coupons.user', 'users')
      .getOne();
  }

  async remove(query: any): Promise<any> {
    return this.couponRepository.update(
      { idCoupon: query.idCoupon },
      { isDeleted: true },
    );
  }

  async update(body: any): Promise<any> {
    return this.couponRepository.save(body);
  }
}
