import {IsNotEmpty} from "class-validator";

export class CreateCouponDto{
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
  startDate: Date
  enddate:Date

}