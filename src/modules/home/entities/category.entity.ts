import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategorySchema {
  @PrimaryGeneratedColumn()
  idCategory: number;

  @Column()
  categoryName: string;
}
