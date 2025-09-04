import { OmitType, PartialType } from '@nestjs/swagger';

export type ConfirmationMethod = 'automatic' | 'manual';
export type SetupFutureUsage = 'on_session' | 'off_session';

export class CreatePaymentIntentDto {
  amount: number;
  currency: string;

  payment_method?: string;
  customer?: string;
  confirmation_method?: string; // automatic or manual
  setup_future_usage?: string; //on_session or off_session
  metadata?: any;
  description?: string;
  receipt_email?: string;
  return_url?: string;
  confirm?: string;
}

export class UpdatePaymentIntentDto extends OmitType(
  PartialType(CreatePaymentIntentDto),
  ['currency', 'customer', 'confirm', 'confirmation_method'],
) {}
