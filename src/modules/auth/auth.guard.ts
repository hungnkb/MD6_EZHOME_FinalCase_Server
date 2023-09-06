import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserSchema } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserSchema>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.userRepository.findOneByOrFail({
        idUser: payload.sub,
      });
      const returnPayload = {
        email: payload.email,
        role: user.role,
        sub: payload.sub,
        active: user.active,
        iat: payload.iat,
        exp: payload.exp,
      };
      request['user'] = returnPayload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
