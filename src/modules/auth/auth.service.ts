import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { accessTokenDto, accessTokenPayloadDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/user.entity';
import { CreateWithGoogleUserDto, changePasswordDto } from '../user/user.dto';
const mailer = require('../../shared/ulti/mail/mailer');
export type User = any;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserSchema>,
    private configService: ConfigService,
  ) {}

  async login(body): Promise<accessTokenDto> {
    const { email, password } = body;

    const user = await this.userService.findByKeyword(email);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    const isMatch = await bcrypt.compare(password, user.password);
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

  async loginWithGoogle(
    body: CreateWithGoogleUserDto,
  ): Promise<accessTokenDto> {
    const email = body.email;
    try {
      const user = await this.userService.findByKeyword(email);
      if (user) {
        const payload = {
          email: user.email,
          role: user.role,
          sub: user.idUser,
          active: user.active,
        };
        const accessToken = await this.assignToken(payload);
        return { accessToken };
      }
    } catch {
      const newUser = await this.userService.createWithGoogle(body);
      if (newUser) {
        const returnUser = await this.userService.findByKeyword(email);
        const payload = {
          email: returnUser.email,
          role: returnUser.role,
          sub: returnUser.idUser,
          active: returnUser.active,
        };
        bcrypt
          .hash(
            returnUser.email,
            parseInt(this.configService.get('BCRYPT_SALT_ROUND')),
          )
          .then((hashedEmail) => {
            mailer.sendMail(
              returnUser.email,
              'Welcome to EZHOME',
              `<a href="http://localhost:3002/api/v1/users/active?email=${returnUser.email}&token=${hashedEmail}"> Active your account here </a>`,
            );
          });
        const accessTokenWithNewUser = await this.assignToken(payload);
        return { accessToken: accessTokenWithNewUser };
      }
    }
  }

  async changePassword(body: changePasswordDto): Promise<UserSchema> {
    const { email, currentPassword, newPassword } = body;
    const user = await this.userService.findByKeyword(email);
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

  async returnAccessToken(
    payload: accessTokenPayloadDto,
  ): Promise<accessTokenDto> {
    const accessToken = await this.assignToken(payload);
    return { accessToken };
  }

  async assignToken(payload: accessTokenPayloadDto): Promise<string> {
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
