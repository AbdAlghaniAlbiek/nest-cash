import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PayPalService } from './paypal.service';

@Controller('orders')
export class PayPalController {
  constructor(private service: PayPalService) {}

  @Post('')
  async createOrder(@Body() data) {
    return await this.service.createOrder(data);
  }

  @Patch(':id/capture')
  async confirmOrder(@Param('id') orderId) {
    return await this.service.captureOrder(orderId);
  }
}
