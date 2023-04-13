import { Module } from '@nestjs/common/decorators';
import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';
import { UserProvider } from '../../user/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider, ...databaseProviders],
})
export class UserModule { }
