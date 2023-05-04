import {IsNotEmpty} from "class-validator";

export class CreateCouponDto{
  @IsNotEmpty()
  createDate: Date;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  couponname: string;
}
export class UpdateCouponDto{
  idCoupon : number
  couponname: string
  createDate: Date
  startDate: Date
  enddate:Date
  

}