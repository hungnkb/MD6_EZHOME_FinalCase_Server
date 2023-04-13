import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HomeSchema } from './home.entity';
import { UserSchema } from 'src/user/user.entity';

@Entity({ name: 'reviews' })
export class ReviewSchema {
  @PrimaryGeneratedColumn()
  idReview: number;

  @Column({ nullable: true })
  rate_stars: number;

  @Column({ nullable: false })
  contents: string;

  @ManyToOne((type) => HomeSchema, (homes) => homes.idHome)
  @JoinColumn({ name: 'idHome', referencedColumnName: 'idHome' })
  idHome: HomeSchema;

  @ManyToOne((type) => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  idUser: UserSchema;
}
