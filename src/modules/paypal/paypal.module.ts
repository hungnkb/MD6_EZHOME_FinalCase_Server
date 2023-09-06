import { Module } from '@nestjs/common';
import { PaypalController } from 'src/paypal/paypal.controller';
import { PaypalService } from 'src/paypal/paypal.service';

@Module({
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
