// @ts-ignore
import { Module } from '@nestjs/common/decorators';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { databaseProviders } from 'src/database/database.providers';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserProvider } from 'src/user/user.provider';
// @ts-ignore
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants';

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
