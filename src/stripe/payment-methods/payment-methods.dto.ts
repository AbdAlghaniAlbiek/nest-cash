import { OmitType, PartialType } from '@nestjs/swagger';
import { Address } from '../customers/customer-stripe.dto';

export enum PaymentMethodType {
  card = 'card',
  us_bank_account = 'us_bank_account',
  sepa_debit = 'sepa_debit',
  ideal = 'ideal',
}

export class CardPaymentMethod {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
}

export class UsBankAccount {
  account_number: string;
  routing_number: string;
  account_holder_type: string;
  account_type: string;
}

export class SepaDebit {
  iban: string;
}

export class Ideal {
  bank: string;
}

export class PaymentMethodBillingDetails {
  name: string;
  email: string;
  address: Address;
}

export class CreatePaymentMethodDto {
  type: PaymentMethodType;
  card?: CardPaymentMethod;
  us_bank_account?: UsBankAccount;
  ideal?: Ideal; //bank (optional – will show bank list to user)
  sepa_debit?: SepaDebit; // iban
  billing_details?: PaymentMethodBillingDetails;
  customerId: string;
}

export class UpdatePaymentMethod extends OmitType(
  PartialType(CreatePaymentMethodDto),
  ['card', 'customerId', 'ideal', 'sepa_debit', 'type', 'us_bank_account'],
) {}
