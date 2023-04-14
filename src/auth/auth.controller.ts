import {
  Post,
  Body,
  Controller,
  Patch,
  Put,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateWithGoogleUserDto, changePasswordDto } from 'src/user/user.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() body: any): Promise<Object> {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Put()
  changePassword(@Body() body: changePasswordDto): Promise<Object> {
    return this.authService.changePassword(body);
  }

  @Post('/login-with-google')
  loginWithGoogle(@Body() body: CreateWithGoogleUserDto): Promise<Object> {
    return this.authService.loginWithGoogle(body);
  }
}
