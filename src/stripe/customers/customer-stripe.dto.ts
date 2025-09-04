import { PartialType } from '@nestjs/swagger';

export class CustomerInvoiceSettings {
  default_payment_method: string;
  custom_fields: any;
  footer: any;
  rendering_options: any;
}

export class Address {
  line1: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export class CustomerShipping {
  name: string;
  phone: string;
  address: string;
}

export class CreateCustomerStripeDto {
  email: string;
  name: string;
  description: string;
  payment_method: string; // ID of a PaymentMethod to attach to the customer
  invoice_settings: CustomerInvoiceSettings;
  metadata: any;
  address: Address;
  shipping: CustomerShipping;
  balance: string; // An internal account balance between you (the merchant) and the customer NOT CREDIT CARD balance.
}

export class UpdateCustomerStripeDto extends PartialType(
  CreateCustomerStripeDto,
) {}
