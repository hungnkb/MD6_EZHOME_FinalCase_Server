import { Module } from '@nestjs/common/decorators';
import { UserController } from '../../user/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { OrderProvider } from 'src/order/order.provider';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...databaseProviders, ...OrderProvider, OrderService],
})
export class OrderModule {}
