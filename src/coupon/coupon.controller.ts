import { Body, Controller, Post, Get, Query,Request, Delete, Patch } from "@nestjs/common";
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

  // @Delete()
  // remove(@Query() query:any, @Request() req): Promise<any> {
  //   return this.couponService.remove(query)
  // }
 
  

}

