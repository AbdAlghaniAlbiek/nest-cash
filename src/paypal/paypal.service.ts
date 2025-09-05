import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PAYPAL_SERVICE } from './paypal.constant';
import { CreateOrder } from './paypal.dto';
const paypal = require('@paypal/checkout-server-sdk');

@Injectable()
export class PayPalService {
  constructor(@Inject(PAYPAL_SERVICE) private paypalService: any) {}

  async createOrder(data: CreateOrder) {
    const { intent, ...restData } = data;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          ...restData,
        },
      ],
    });

    try {
      const order = await this.paypalService.execute(request);
      return order;
    } catch (err) {
      throw new InternalServerErrorException('Error creating PayPal order');
    }
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const capture = await this.paypalService.execute(request);
      return capture;
    } catch (err) {
      throw new InternalServerErrorException('Error creating PayPal order');
    }
  }
}
