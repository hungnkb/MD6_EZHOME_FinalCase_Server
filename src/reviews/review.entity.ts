import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HomeSchema } from 'src/modules/home/entities/home.entity';
import { UserSchema } from 'src/modules/user/user.entity';

@Entity({ name: 'reviews' })
export class ReviewSchema {
  @PrimaryGeneratedColumn()
  idReview: number;

  @Column({ nullable: true })
  rate_stars: number;

  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: true, default: () => 'CAST(NOW() AS DATE)' })
  createdAt: Date;

  @ManyToOne(() => HomeSchema, (homes) => homes.idHome)
  @JoinColumn({ name: 'idHome', referencedColumnName: 'idHome' })
  idHome: HomeSchema;

  @ManyToOne(() => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  idUser: UserSchema;
}
