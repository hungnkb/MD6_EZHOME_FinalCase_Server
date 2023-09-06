import { HomeSchema } from 'src/modules/home/entities/home.entity';
import { UserSchema } from 'src/modules/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum OrderStatus {
  _ONGOING = 'ongoing',
  _DONE = 'done',
  _CANCELLED = 'cancelled',
}

@Entity({ name: 'orders' })
export class OrderSchema {
  @PrimaryGeneratedColumn()
  idOrder: number;

  @Column({ type: 'date', nullable: false })
  checkin: Date;

  @Column({ type: 'date', nullable: false })
  checkout: Date;

  @Column({ nullable: true, default: () => 'CAST(NOW() AS DATE)' })
  createAt: Date;

  @Column({ nullable: false })
  charged: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus._ONGOING,
  })
  status: string;

  @ManyToOne(() => UserSchema, (users) => users.idUser)
  @JoinColumn({ name: 'user', referencedColumnName: 'idUser' })
  idUser: number;

  @ManyToOne(() => HomeSchema, (homes) => homes.idHome)
  @JoinColumn({ name: 'home', referencedColumnName: 'idHome' })
  idHome: number;
}
