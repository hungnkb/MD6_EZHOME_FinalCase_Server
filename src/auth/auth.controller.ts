import { Post, Body, Controller, Options, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateWithGoogleUserDto, changePasswordDto } from 'src/user/user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() body: any): Promise<Object> {
    return this.authService.login(body);
  }

  @Options()
  verifyToken(@Body() body: any): any {
    return this.authService.verifyToken(body.accessToken);
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
