import { Injectable } from '@nestjs/common';
import braintree from 'braintree';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

const paypalGateWay = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: `${process.env.BRAINTREE_MERCHAN_ID}`,
    publicKey: `${process.env.BRAINTREE_PUBLIC_KEY}`,
    privateKey: `${process.env.BRAINTREE_PRIVATE_KEY}`
});

export default paypalGateWay;
