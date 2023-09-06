import {
  Post,
  Body,
  Controller,
  Put,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateWithGoogleUserDto, changePasswordDto } from '../user/user.dto';
import { UserSchema } from '../user/user.entity';
import { accessTokenDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() body: any): Promise<accessTokenDto> {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Put()
  changePassword(@Body() body: changePasswordDto): Promise<UserSchema> {
    return this.authService.changePassword(body);
  }

  @Post('/login-with-google')
  loginWithGoogle(
    @Body() body: CreateWithGoogleUserDto,
  ): Promise<accessTokenDto> {
    return this.authService.loginWithGoogle(body);
  }
}
