import {
  BadRequestException,
  Controller,
  Inject,
  Injectable,
} from '@nestjs/common';
import Stripe from 'stripe';
import {
  CreatePaymentMethodDto,
  PaymentMethodType,
  UpdatePaymentMethod,
} from './payment-methods.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(@Inject() private readonly stripeService: Stripe) {}

  async create(data: CreatePaymentMethodDto) {
    let payMethType;
    if (data.type === PaymentMethodType.card) {
      if (!data.card) {
        throw new BadRequestException(`You should send card info`);
      }
      payMethType = { card: { ...data.card } };
    } else if (data.type === PaymentMethodType.us_bank_account) {
      if (!data.us_bank_account) {
        throw new BadRequestException(`You should send us bank account info`);
      }
      payMethType = { us_bank_account: { ...data.us_bank_account } };
    } else if (data.type === PaymentMethodType.sepa_debit) {
      if (!data.sepa_debit) {
        throw new BadRequestException(`You should send seba debit info`);
      }
      payMethType = { sepa_debit: { ...data.sepa_debit } };
    } else if (data.type === PaymentMethodType.ideal) {
      if (!data.ideal) {
        throw new BadRequestException(`You should send ideal info`);
      }
      payMethType = { ideal: { ...data.ideal } };
    } else {
      throw new BadRequestException(
        `You should provide valid payment method: ${Object.values(PaymentMethodType).join(', ')}`,
      );
    }

    const createdPaymentMethod = await this.stripeService.paymentMethods.create(
      {
        type: data.type,
        customer: data.customerId,
        ...(data.billing_details && { billing_details: data.billing_details }),
        ...payMethType,
      },
    );

    return createdPaymentMethod;
  }

  async update(payMethId: string, data: UpdatePaymentMethod) {
    const updatedPaymentMethod = await this.stripeService.paymentMethods.update(
      payMethId,
      { ...data },
    );

    return updatedPaymentMethod;
  }

  async getOne(payMethId: string) {
    const paymentMethod =
      await this.stripeService.paymentMethods.retrieve(payMethId);
    return paymentMethod;
  }

  async getAll(limit?: number, startAfter?: string) {
    const paymentMethods = await this.stripeService.paymentMethods.list({
      ...(limit && { limit }),
      ...(startAfter && { starting_after: startAfter }),
    });
    return paymentMethods;
  }

  async attach(customerId: string, paymentMethodId: string) {
    return await this.stripeService.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  }
}
