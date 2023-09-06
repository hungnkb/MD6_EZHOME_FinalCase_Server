import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  checkin: Date;

  @ApiProperty()
  @IsNotEmpty()
  checkout: Date;

  @ApiProperty()
  @IsNotEmpty()
  charged: number;

  @ApiProperty()
  @IsNotEmpty()
  idUser: number;

  @ApiProperty()
  @IsNotEmpty()
  idHome: number;
}

export class UpdateStatusOrder {
  @IsNotEmpty()
  idHome: number;

  @IsNotEmpty()
  status: string;
}
