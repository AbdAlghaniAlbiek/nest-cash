import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { STRIPE_SERVICE } from '../stripe.constant';
import Stripe from 'stripe';
import {
  CreatePaymentIntentDto,
  UpdatePaymentIntentDto,
} from './payment-intents.dto';

@Injectable()
export class PaymentIntentsService {
  constructor(@Inject(STRIPE_SERVICE) private readonly stripeService: Stripe) {}

  async create(data: CreatePaymentIntentDto) {
    const { currency, amount, ...restData } = data;
    return await this.stripeService.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,

      ...(restData.customer && { customer: restData.customer }),
      ...(restData.description && { description: restData.description }),
      ...(restData.metadata && { customer: restData.metadata }),
      ...(restData.receipt_email && { receipt_email: restData.receipt_email }),
      ...(restData.return_url && { return_url: restData.return_url }),
      ...(restData.setup_future_usage && {
        setup_future_usage: restData.setup_future_usage,
      }),
      ...(restData.payment_method && {
        payment_method: restData.payment_method,
      }),
    });
  }

  async update(payIntentId: string, data: UpdatePaymentIntentDto) {
    const payIntent =
      await this.stripeService.paymentIntents.retrieve(payIntentId);

    const updatedPaymentIntent = await this.stripeService.paymentIntents.update(
      payIntentId,
      {
        ...((payIntent.status === 'requires_payment_method' ||
          payIntent.status === 'requires_confirmation') &&
          data.amount && { amount: data.amount }),
        ...(data.description && { description: data.description }),
        ...(data.metadata && { customer: data.metadata }),
        ...(data.receipt_email && { receipt_email: data.receipt_email }),
        ...(data.return_url && { return_url: data.return_url }),
        ...(data.setup_future_usage && {
          setup_future_usage: data.setup_future_usage,
        }),
        ...(payIntent.status === 'requires_payment_method' &&
          data.payment_method && {
            payment_method: data.payment_method,
          }),
      },
    );

    return updatedPaymentIntent;
  }

  async cancel(payIntentId: string) {
    const payIntent =
      await this.stripeService.paymentIntents.retrieve(payIntentId);

    if (
      payIntent.status === 'requires_payment_method' ||
      payIntent.status === 'requires_confirmation' ||
      payIntent.status === 'requires_action' ||
      payIntent.status === 'processing'
    ) {
      const canceledPayIntent =
        await this.stripeService.paymentIntents.cancel(payIntentId);
      return canceledPayIntent;
    }

    throw new BadRequestException(
      `You can't cancel payment intent because the status is: ${payIntent.status}`,
    );
  }

  async getOne(payIntentId: string) {
    return await this.stripeService.paymentIntents.retrieve(payIntentId);
  }

  async confirm(payIntentId: string) {
    const payIntent =
      await this.stripeService.paymentIntents.retrieve(payIntentId);
    if (payIntent.confirmation_method === 'manual') {
      const confirmedPaymentIntent =
        await this.stripeService.paymentIntents.confirm(payIntentId);
      return confirmedPaymentIntent;
    }

    throw new BadRequestException(`Payment intent is already confirmed`);
  }
}
