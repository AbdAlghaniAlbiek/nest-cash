import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { StripeModule } from './stripe/stripe.module';
import { PayPalModule } from './paypal/paypal.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'stripe',
        module: StripeModule,
      },
      {
        path: 'paypal',
        module: PayPalModule,
      },
    ]),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
