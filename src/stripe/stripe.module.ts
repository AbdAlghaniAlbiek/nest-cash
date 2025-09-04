import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomersStripeController } from './customers/customers.-stripe.controller';
import { PaymentIntentsController } from './payment-intents/payment-intents.controller';
import { PaymentMethodsController } from './payment-methods/payment-methods.controller';
import { CustomersStripeService } from './customers/customers-stripe.service';
import { PaymentIntentsService } from './payment-intents/payment-intents.service';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';
import { STRIPE_SERVICE } from './stripe.constant';
import Stripe from 'stripe';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [
    CustomersStripeController,
    PaymentIntentsController,
    PaymentMethodsController,
  ],
  providers: [
    CustomersStripeService,
    PaymentIntentsService,
    PaymentMethodsService,
    {
      provide: STRIPE_SERVICE,
      useFactory: (ConfigService: ConfigService) => {
        return new Stripe(ConfigService.get('STRIPE_API_KEY')!, {
          apiVersion: '2025-08-27.basil', // Use latest API version, or "null" for your default
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    CustomersStripeService,
    PaymentIntentsService,
    PaymentMethodsService,
  ],
})
export class StripeModule {
  // static forRootAsync(): DynamicModule {
  //   return {
  //     module: StripeModule,
  //     controllers: [
  //       CustomersStripeController,
  //       PaymentIntentsController,
  //       PaymentMethodsController,
  //     ],
  //     imports: [ConfigModule.forRoot()],
  //     providers: [
  //       StripeService,
  //       {
  //         provide: 'STRIPE_API_KEY',
  //         useFactory: (configService: ConfigService) =>
  //           configService.get('STRIPE_API_KEY'),
  //         inject: [ConfigService],
  //       },
  //     ],
  //   };
  // }
}
