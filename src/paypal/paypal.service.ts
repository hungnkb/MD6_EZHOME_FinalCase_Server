import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PaypalService {
    constructor(
        private configService: ConfigService
    ) { }

    async clienTokenGenerate() {
        const auth = Buffer.from(this.configService.get('PAYPAL_CLIENT_ID') + ":" + this.configService.get('PAYPAL_APP_SECRET')).toString("base64")

        const response = await fetch(`${process.env.BASE_SANDBOX_URL}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const data = await response.json();
        return data.access_token;
    }

    async createOrder() {
        const accessToken = await this.clienTokenGenerate();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "0.1",
                        },
                    },
                ],
            }),
        });
        const data = await response.json();
        return data;
    }

    async capturePayment(orderId: string) {
        const accessToken = await this.clienTokenGenerate();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        // const data = await response.json();
        // console.log(data);

        return response.json();
    }
}

