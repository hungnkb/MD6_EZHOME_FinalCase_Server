import { Body, Controller, Post } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./coupon.dto";

@Controller()
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()
  create(@Body() body: CreateCouponDto): Promise<any>{
    return this.couponService.create(body)
  }
}
