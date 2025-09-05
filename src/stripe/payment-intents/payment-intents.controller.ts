import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentIntentsService } from './payment-intents.service';
import {
  CreatePaymentIntentDto,
  UpdatePaymentIntentDto,
} from './payment-intents.dto';

@Controller('payment-intents')
export class PaymentIntentsController {
  constructor(private service: PaymentIntentsService) {}

  @Post('')
  async create(@Body() data: CreatePaymentIntentDto) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePaymentIntentDto) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.cancel(id);
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string) {
    return await this.service.confirm(id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }
}
