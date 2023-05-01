import { Body, Controller, Get, Post } from "@nestjs/common";
import { PaypalService } from "./paypal.service";

@Controller()
export class PaypalController {
    constructor(private paypalService: PaypalService) { }

    @Get()
    clienTokenGenerate() {
        return this.paypalService.clienTokenGenerate();
    }

    @Post('/create-order')
    createOrder() {
        return this.paypalService.createOrder();
    }

    @Post('/capture-payment')
    capturePayment(@Body() body: any): Promise<Object> {
        return this.paypalService.capturePayment(body.idOrder);
    }
}   