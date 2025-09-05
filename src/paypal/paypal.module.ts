import { Module } from '@nestjs/common';
import { PayPalController } from './paypal.controller';
import { PayPalService } from './paypal.service';
import { ConfigService } from '@nestjs/config';
import { PAYPAL_SERVICE } from './paypal.constant';
const paypal = require('@paypal/checkout-server-sdk');

@Module({
  controllers: [PayPalController],
  providers: [
    PayPalService,
    {
      provide: PAYPAL_SERVICE,
      useFactory: (configService: ConfigService) => {
        const environment = new paypal.core.SandboxEnvironment(
          configService.get('CLIENT_ID'),
          configService.get('CLIENT_SECRET'),
        );
        const client = new paypal.core.PayPalHttpClient(environment);
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [PayPalService],
})
export class PayPalModule {}
