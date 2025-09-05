class OrderAmount {
  currency_code: string;
  value: number;
}

class OrderShipping {
  name?: { full_name: string };
  address?: {
    address_line_1: string;
    admin_area_2: string;
    admin_area_1: string;
    postal_code: string;
    country_code: string;
  };
}

export class CreateOrder {
  intent: string;
  amount: OrderAmount;
  description?: string;
  shipping: OrderShipping;

  //   "custom_id": "USER-5678",
  // "invoice_id": "INV-00001",
}
