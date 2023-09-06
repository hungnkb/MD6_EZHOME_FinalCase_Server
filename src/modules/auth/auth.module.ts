import { Module } from '@nestjs/common/decorators';
import { DatabaseModule } from 'src/modules/database/database.module';
import { AuthController } from './auth.controller';
import { databaseProviders } from 'src/modules/database/database.providers';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service';
import { UserProvider } from '../user/user.provider';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...databaseProviders, ...UserProvider],
})
export class AuthModule {}
