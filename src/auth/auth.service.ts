import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CreateWithGoogleUserDto, changePasswordDto } from 'src/user/user.dto';
import { Repository } from 'typeorm';
import { UserSchema } from 'src/user/user.entity';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
const mailer = require('../shared/ulti/mail/mailer');
export type User = any;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserSchema>,
    private configService: ConfigService,
  ) { }

  async login(body): Promise<Object> {
    const { email, password } = body;

    let user = await this.userService.findByKeyword(email);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    let isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (isMatch) {
      const payload = {
        email: user.email,
        role: user.role,
        sub: user.idUser,
        active: user.active,
      };
      return {
        accessToken: await this.assignToken(payload),
      };
    }
    throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
  }

  async loginWithGoogle(body: CreateWithGoogleUserDto): Promise<Object> {
    let email = body.email;
    try {
      let user = await this.userService.findByKeyword(email);
      if (user) {
        const payload = {
          email: user.email,
          role: user.role,
          sub: user.idUser,
          active: user.active,
        };
        let accessToken = await this.assignToken(payload)

        return { accessToken };
      }
    } catch {
      let newUser = await this.userService.createWithGoogle(body);
      if (newUser) {
        let returnUser = await this.userService.findByKeyword(email);
        const payload = {
          email: returnUser.email,
          role: returnUser.role,
          sub: returnUser.idUser,
          active: returnUser.active,
        };
        
        bcrypt
          .hash(returnUser.email, parseInt(this.configService.get('BCRYPT_SALT_ROUND')))
          .then((hashedEmail) => {
            mailer.sendMail(
              returnUser.email,
              'Xin Chào,Hãy xác thực tài khoản EZHome 0.1',
              `<a href="http://localhost:3002/api/v1/users/active?email=${returnUser.email}&token=${hashedEmail}"> Verify </a>`,
            );
          });
        let accessToken = await this.assignToken(payload)
        return { accessToken };
      }
    }
  }

  async changePassword(body: changePasswordDto): Promise<Object> {
    const { email, currentPassword, newPassword } = body;
    let user = await this.userService.findByKeyword(email);
    const isMatch = await this.verifyPassword(currentPassword, user.password);
    if (isMatch) {
      const saltOrRounds = 10;
      const newHashPassword = await bcrypt.hash(newPassword, saltOrRounds);
      user.password = newHashPassword;
      return this.userRepository.save(user);
    }
    throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
  }

  // async getProfile(accessToken: string): Promise<Object> {
  //   const payload = await this.jwtService.verify(accessToken, {
  //     secret: jwtConstants.secret,
  //   });
  //   return req;
  // }

  async returnAccessToken(payload: Object): Promise<Object> {
    return { accessToken: this.assignToken(payload) };
  }

  async assignToken(payload: Object): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    const bearerToken = 'Bearer ' + token;
    return bearerToken;
  }

  async verifyPassword(
    currentPassword: string,
    hashPassword: string,
  ): Promise<boolean | any> {
    return await bcrypt.compare(currentPassword, hashPassword);
  }
}
