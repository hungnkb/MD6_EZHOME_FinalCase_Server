import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSchema } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
const mailer = require('../../shared/ulti/mail/mailer');

export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserSchema>,
  ) {}

  async findAll(): Promise<UserSchema[] | undefined> {
    return this.userRepository.find();
  }

  async findByKeyword(obj: any): Promise<UserSchema | undefined> {
    const user = await this.userRepository.findOne({
      where: [{ idUser: obj }, { email: obj }, { phone: obj }],
    });
    if (user) {
      return user;
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  async create(body: CreateUserDto): Promise<UserSchema> {
    try {
      const { password, email, phone } = body;
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);
      const newUser = await this.userRepository.save({
        password: hashPassword,
        email,
        phone,
      });
      if (newUser) {
        bcrypt
          .hash(newUser.email, parseInt(process.env.BCRYPT_SALT_ROUND))
          .then((hashedEmail) => {
            mailer.sendMail(
              newUser.email,
              'Xin Chào,Hãy xác thực tài khoản EZHome 0.1',
              `<a href="http://localhost:3002/api/v1/users/active?email=${newUser.email}&token=${hashedEmail}"> Verify </a>`,
            );
          });
      }
      return newUser;
    } catch (err) {
      throw new HttpException(err.code, HttpStatus.BAD_REQUEST);
    }
  }

  async createWithGoogle(body): Promise<any> {
    const email = body.email;
    const newUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({ email })
      .execute();

    if (newUser) {
      return newUser;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(body: UpdateUserDto): Promise<any> {
    const { email, phone, fullName, address, role, image } = body;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository
      .createQueryBuilder()
      .update(UserSchema)
      .set({ phone, fullName, address, role, image })
      .where({ idUser: user.idUser })
      .execute();
    return newUser;
  }

  async active(query): Promise<any> {
    await this.findByKeyword(query.email);
    await this.userRepository
      .createQueryBuilder()
      .update('users')
      .set({ active: true })
      .where({ email: query.email })
      .execute();
    return;
  }

  async activeHost({ idUser }): Promise<any> {
    const user = await this.findByKeyword(idUser);
    if (user.idUser) {
      if (user.role == 'user') {
        await this.userRepository
          .createQueryBuilder()
          .update('users')
          .set({ role: 'host' })
          .where({ idUser })
          .execute();
        return 'Active host success';
      }
      return 'Active host already';
    }
  }

  async sendLinkForgotPassword(body): Promise<any> {
    if (!body.email) {
      throw new HttpException('INsert your email', HttpStatus.BAD_REQUEST);
    } else {
      const user = await this.findByKeyword(body.email);
      bcrypt
        .hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hashedEmail) => {
          mailer.sendMail(
            user.email,
            'Reset password',
            `<a href="http://localhost:3000/reset-password?email=${user.email}&token=${hashedEmail}"> Reset Password </a>`,
          );
        });
    }
  }
  async resetpassword(body): Promise<any> {
    const { email, token, password } = body;
    const hashPassword = await bcrypt.hash(password, 10);
    bcrypt.compare(email, token, async (err, result) => {
      if (result == true) {
        await this.userRepository
          .createQueryBuilder()
          .update('users')
          .set({ password: hashPassword })
          .where({ email })
          .execute();
        return;
      }
    });
  }

  async changePassword(body): Promise<any> {
    const { oldPassword, newPassword, email } = body;
    if (oldPassword != '') {
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      const user = await this.findByKeyword(email);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (isMatch) {
        const activeUser = await this.userRepository
          .createQueryBuilder()
          .update('users')
          .set({ password: hashNewPassword })
          .where({ email: email })
          .execute();
        return activeUser;
      } else {
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
      }
    } else {
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      return await this.userRepository
        .createQueryBuilder()
        .update('users')
        .set({ password: hashNewPassword })
        .where({ email: email })
        .execute();
    }
  }
}
