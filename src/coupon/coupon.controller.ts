import { Body, Controller, Post, Get, Query,Request, Delete, Patch, Put } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CreateCouponDto, UpdateCouponDto } from "./coupon.dto";

@Controller()
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()
  create(@Body() body: CreateCouponDto): Promise<any>{
    return this.couponService.create(body)
  }
  
  @Get()
  findByKeyword(@Query() query: any, @Request() req): Promise<any> {
    return this.couponService.findByKeyword(query);
  }

  @Delete()
  remove(@Query() query: any): Promise<any> {
    return this.couponService.remove(query)
  }

  @Put()
  update(@Body() body: any): Promise<any> {
    return this.couponService.update(body)
  }
}
