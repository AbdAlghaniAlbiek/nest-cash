import { Inject, Injectable } from '@nestjs/common';
import { STRIPE_SERVICE } from '../stripe.constant';
import Stripe from 'stripe';
import {
  CreateCustomerStripeDto,
  UpdateCustomerStripeDto,
} from './customer-stripe.dto';

@Injectable()
export class CustomersStripeService {
  constructor(@Inject(STRIPE_SERVICE) private readonly stripeService: Stripe) {}

  async create(customer: CreateCustomerStripeDto) {
    const createdCustomer = await this.stripeService.customers.create({
      ...(customer.address && { address: customer.address }),
      ...(customer.name && { name: customer.name }),
      ...(customer.email && { email: customer.email }),
      ...(customer.description && { address: customer.description }),
      ...(customer.metadata && { metadata: customer.metadata }),
      ...(customer.invoice_settings && {
        invoice_settings: { ...customer.invoice_settings },
      }),
      ...(customer.shipping && { shipping: { ...customer.shipping } }),
      ...(customer.balance && { balance: customer.balance }),
      ...(customer.payment_method && {
        payment_method: customer.payment_method,
      }),
    });

    return createdCustomer;
  }

  async update(customerId: string, customer: UpdateCustomerStripeDto) {
    const updatedCustomer = await this.stripeService.customers.update(
      customerId,
      {
        ...(customer.address && { address: customer.address }),
        ...(customer.name && { name: customer.name }),
        ...(customer.email && { email: customer.email }),
        ...(customer.description && { address: customer.description }),
        ...(customer.metadata && { metadata: customer.metadata }),
        ...(customer.invoice_settings && {
          invoice_settings: { ...customer.invoice_settings },
        }),
        ...(customer.shipping && { shipping: { ...customer.shipping } }),
        ...(customer.balance && { balance: customer.balance }),
        ...(customer.payment_method && {
          payment_method: customer.payment_method,
        }),
      },
    );

    return updatedCustomer;
  }

  async delete(customerId: string) {
    const deletedCustomer = await this.stripeService.customers.del(customerId);
    return deletedCustomer;
  }

  async getOne(customerId: string) {
    const deletedCustomer =
      await this.stripeService.customers.retrieve(customerId);
    return deletedCustomer;
  }

  async getAll(limit?: number, startAfter?: string) {
    const customers = await this.stripeService.customers.list({
      ...(limit && { limit }),
      ...(startAfter && { starting_after: startAfter }),
    });
    return customers;
  }
}
