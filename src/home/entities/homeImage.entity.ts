import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HomeSchema } from './home.entity';

@Entity({ name: 'homeImages' })
export class HomeImageSchema {
  @PrimaryGeneratedColumn()
  idHomeImage: number;

  @Column({
    default: 'https://www.vinebrookhomes.com/img/default.png',
    nullable: true,
  })
  urlHomeImage: string;

  @ManyToOne((type) => HomeSchema, (homes) => homes.idHome)
  @JoinColumn({ name: 'idHome', referencedColumnName: 'idHome' })
  idHome: HomeSchema;
}
