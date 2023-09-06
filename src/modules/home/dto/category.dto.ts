import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  categoryName: string;
}

export class UpdateCategoryDto {
  categoryName: string;
}
