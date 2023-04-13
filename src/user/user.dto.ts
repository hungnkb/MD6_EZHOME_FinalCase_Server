import { IsNotEmpty, IsStrongPassword, Length, IsEmail } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 8)
  password: string;

  image: string;
  phone: string;
  fullName: string;
  address: string;
  googleEmail: string;
  role: UserRole;
}

export class UpdateUserDto {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  googleEmail: string;
  role: UserRole;
}

export class changePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 8)
  currentPassword: string;

  @IsNotEmpty()
  @Length(6, 20)
  newPassword: string;
}

export class CreateWithGoogleUserDto {
  @IsEmail()
  email: string;
}
