import { UserSchema } from '../modules/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum NotificationStatus {
  _SEEN = 'seen',
  _UNSEEN = 'unseen',
}

@Entity({ name: 'notifications' })
export class NotificationSchema {
  @PrimaryGeneratedColumn()
  idNotification: number;

  @Column({ nullable: true, default: () => 'CAST(NOW() AS DATE)' })
  createdAt: Date;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  dataUrl: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus._UNSEEN,
  })
  status: string;

  @ManyToOne(() => UserSchema, (users) => users.idUser, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'idUser' })
  user: number;
}
