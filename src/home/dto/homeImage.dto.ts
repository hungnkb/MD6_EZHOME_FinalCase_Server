import { IsNotEmpty } from 'class-validator';
import { HomeSchema } from '../entities/home.entity';

export class CreateHomeImageDto {
  @IsNotEmpty()
  urlHomeImage: string;

  @IsNotEmpty()
  idHome: HomeSchema;
}

export class UpdateHomeDto {
  urlHomeImage: string;
  idHome: HomeSchema;
}
