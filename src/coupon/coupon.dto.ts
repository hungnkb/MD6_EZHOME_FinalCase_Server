import {IsNotEmpty} from "class-validator";

export class CreateCouponDto{
  @IsNotEmpty()
  createDate: Date;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  vale: number;

  @IsNotEmpty()
  idUser: number;
}