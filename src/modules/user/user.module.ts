import { Module } from '@nestjs/common/decorators';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { databaseProviders } from 'src/modules/database/database.providers';
import { UserService } from './user.service';
import { UserProvider } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider, ...databaseProviders],
})
export class UserModule {}
