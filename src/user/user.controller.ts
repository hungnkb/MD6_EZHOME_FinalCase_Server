import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Query,
  Param,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query): Promise<any> {
    if (query.email) {
      return this.userService.findByKeyword(query.email);
    }
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.create(body);
  }

  @Put()
  update(@Body() body: UpdateUserDto): Promise<any> {
    return this.userService.update(body);
  }

  @Get('/active')
  @Redirect('http://localhost:3000/')
  active(@Query() query: any): Promise<any> {
    return this.userService.active(query);
  }

  @Get('/active-host/:idUser')
  activeHost(@Param() param: any): Promise<any> {
    return this.userService.activeHost(param);
  }

  @Post('/forgot-password')
  sendLinkForgotPassword(@Body() body: any): Promise<any> {
    return this.userService.sendLinkForgotPassword(body);
  }

  @Post('/password-reset')
  resetpassword(@Body() body: any): Promise<any> {
    return this.userService.resetpassword(body);
  }

  @Post('/change-password')
  changePassword(@Body() body: any): Promise<any> {
    return this.userService.changePassword(body);
  }
}
