import { UserSchema } from 'src/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategorySchema } from './category.entity';
import { HomeImageSchema } from './homeImage.entity';

@Entity({ name: 'homes' })
export class HomeSchema {
  @PrimaryGeneratedColumn()
  idHome: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  bathrooms: number;

  @Column({ nullable: false })
  bedrooms: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  rate_stars: number;

  @Column({ default: true })
  status: boolean;

  @OneToMany((type) => HomeImageSchema, (homeimages) => homeimages.idHome)
  @JoinColumn({name: 'images', referencedColumnName: 'idHome'})
  images: HomeImageSchema[];

  @ManyToOne((type) => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  idUser: number;

  @ManyToOne((type) => CategorySchema, (categories) => categories.idCategory)
  @JoinColumn({ name: 'idCategory', referencedColumnName: 'idCategory' })
  idCategory: number;
}
