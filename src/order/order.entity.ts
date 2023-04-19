import { UserSchema } from 'src/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { HomeImageSchema } from '../home/entities/homeImage.entity';
import { HomeSchema } from '../home/entities/home.entity';

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
        default: OrderStatus._ONGOING
    })
    status: string;

    @ManyToOne(type => UserSchema, users => users.idUser)
    @JoinColumn({ name: 'user', referencedColumnName: 'idUser' })
    idUser: number;

    @ManyToOne(type => HomeSchema, homes => homes.idHome)
    @JoinColumn({ name: 'home', referencedColumnName: 'idHome' })
    idHome: number;
}
