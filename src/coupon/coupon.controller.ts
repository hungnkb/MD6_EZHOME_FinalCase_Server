import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "../order/order.service";
import { CreateOrderDto } from "../order/order.dto";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./coupon.dto";

@Controller()
export class CouponController {
  constructor(private couponservice: CouponService) {}
  @Post()
  create(@Body() body: CreateCouponDto): Promise<any> {
    return this.couponservice.create(body);
  }
}
