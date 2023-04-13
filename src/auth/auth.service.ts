import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CreateWithGoogleUserDto, changePasswordDto } from 'src/user/user.dto';
import { Repository } from 'typeorm';
import { UserSchema } from 'src/user/user.entity';
//Thao tác câu lệnh với database
export type User = any;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserSchema>,
  ) {}

  async login(body): Promise<Object> {
    const { email, password } = body;

    let user = await this.userService.findByKeyword(email);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    let isMatch = await bcrypt.compare(password, user.password);
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
        return this.returnAccessToken(payload);
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
        return this.returnAccessToken(payload);
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

  async verifyToken(accessToken: string): Promise<Object> {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async returnAccessToken(payload: Object): Promise<Object> {
    return { accessToken: this.assignToken(payload) };
  }

  assignToken(payload: Object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyPassword(
    currentPassword: string,
    hashPassword: string,
  ): Promise<boolean | any> {
    return await bcrypt.compare(currentPassword, hashPassword);
  }
}
