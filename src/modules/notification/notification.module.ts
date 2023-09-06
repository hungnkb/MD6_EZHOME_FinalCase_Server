import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { NotificationProvider } from 'src/notification/notification.provider';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationController } from 'src/notification/notification.controller';
import { UserProvider } from '../user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...NotificationProvider, ...UserProvider, NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
