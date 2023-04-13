import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  _ADMIN = 'admin',
  _USER = 'user',
  _HOST = 'host',
}

@Entity({ name: 'users' })
export class UserSchema {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, unique: true })
  googleEmail: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  active: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole._USER,
  })
  role: UserRole;
}
