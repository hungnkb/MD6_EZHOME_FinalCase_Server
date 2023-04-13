import { Inject, HttpException, HttpStatus, Redirect } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSchema } from './user.entity';
import {
  CreateUserDto,
  CreateWithGoogleUserDto,
  UpdateUserDto,
} from './user.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
const mailer = require('../shared/ulti/mail/mailer');
//Thao tác cụ thể dữ liệu db
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserSchema>,
  ) {}

  async findAll(): Promise<UserSchema[]> {
    return this.userRepository.find();
  }

  async findByKeyword(keyword: any): Promise<UserSchema> {
    let user = await this.userRepository.findOne({
      where: [{ idUser: keyword }, { email: keyword }, { phone: keyword }],
    });

    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async create(body: CreateUserDto): Promise<UserSchema> {
    try {
      let { password, email, phone } = body;
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);
      let newUser = await this.userRepository.save({
        password: hashPassword,
        email,
        phone,
      });

      bcrypt
        .hash(newUser.email, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hashedEmail) => {
          console.log(newUser.email);
          mailer.sendMail(
            newUser.email,
            'Xin Chào,Hãy xác thực tài khoản EZHome 0.1',
            `<a href="http://localhost:3002/api/v1/users/active?email=${newUser.email}&token=${hashedEmail}"> Verify </a>`,
          );
        });

      return newUser;
    } catch (err) {
      throw new HttpException(err.code, HttpStatus.BAD_REQUEST);
    }
  }

  async createWithGoogle(body): Promise<any> {
    let email = body.email;
    let newUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({ email })
      .execute();

    if (newUser) {
      return newUser;
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  async update(body: UpdateUserDto): Promise<any> {
    let { email, phone, fullName, address } = body;
    let user = await this.userRepository.findOneOrFail({ where: { email } });
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    let newUser = await this.userRepository
      .createQueryBuilder()
      .update(UserSchema)
      .set({ phone, fullName, address })
      .where({ idUser: user.idUser })
      .execute();

    return newUser;
  }

  async active(query): Promise<any> {
    let user = await this.findByKeyword(query.email);
    console.log(user);
    if (user.active) {
      throw new HttpException('Already active', HttpStatus.OK);
    }
    let activeUser = await this.userRepository
      .createQueryBuilder()
      .update('users')
      .set({ active: true })
      .where({ email: query.email })
      .execute();
  }

  async activeHost({ idUser }): Promise<any> {
    let user = await this.findByKeyword(idUser);
    if (user.idUser) {
      if (user.role == 'user') {
        let activeUserHost = await this.userRepository
          .createQueryBuilder()
          .update('users')
          .set({ role: 'host' })
          .where({ idUser })
          .execute();
        throw new HttpException('Active host success', HttpStatus.OK);
      }
      throw new HttpException('Active host already', HttpStatus.OK);
    }
  }
}
