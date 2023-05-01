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