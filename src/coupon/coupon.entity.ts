
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
  Entity
} from "typeorm";
import { UserSchema } from "../user/user.entity";


@Entity({ name: "coupons" })
export class CouponSchema {
  @PrimaryGeneratedColumn()
  idCoupon: number;

  @Column({ nullable: false })
  couponname: string;

  @Column({ type: "date", nullable: false })
  createDate: Date;

  @Column({ type: "date", nullable: false })
  startDate: Date;

  @Column({ type: "date", nullable: false })
  endDate: Date;

  @Column({ nullable: false})
  value: number;

  @ManyToOne((type) => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'user', referencedColumnName: 'idUser' })
  user:number

}

