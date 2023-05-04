
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
  Entity
} from "typeorm";
import { UserSchema } from "../user/user.entity";
import { HomeSchema } from "src/home/entities/home.entity";


@Entity({ name: "coupons" })
export class CouponSchema {
  @PrimaryGeneratedColumn()
  idCoupon: number;

  @Column({ nullable: false })
  couponname: string;

  @Column({ type: "date", nullable: true })
  createDate: Date;

  @Column({ type: "date", nullable: false })
  startDate: Date;

  @Column({ type: "date", nullable: false })
  endDate: Date;

  @Column({ nullable: false })
  value: number;

  @Column({ nullable: true, default: false })
  isDeleted: boolean;

  @OneToMany((type) => HomeSchema, (homes) => homes.idCoupon, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'home', referencedColumnName: 'idHome' })
  home: HomeSchema[]

  @ManyToOne((type) => UserSchema, (users) => users.idUser, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'idUser' })
  user: number

}

