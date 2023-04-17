import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  checkin: Date;

  @IsNotEmpty()
  checkout: Date;

  @IsNotEmpty()
  charged: number;

  @IsNotEmpty()
  idUser: number;

  @IsNotEmpty()
  idHome: number

}

export class UpdateStatusOrder {
  @IsNotEmpty()
  idHome: number;

  @IsNotEmpty()
  status: string;
}
