import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './payment-methods.dto';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private service: PaymentMethodsService) {}

  @Post('')
  async create(@Body() data: CreatePaymentMethodDto) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') payMethId: string,
    @Body() data: CreatePaymentMethodDto,
  ) {
    return await this.service.update(payMethId, data);
  }

  @Get(':id')
  async getOne(@Param('id') payMethId: string) {
    return await this.service.getOne(payMethId);
  }

  @Get()
  async getAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('startAfter') startAfter: string,
  ) {
    return await this.service.getAll(limit ?? 10, startAfter);
  }

  @Patch(':id/attach-to/:customerId')
  async attach(
    @Param('id') payMethId: string,
    @Param('customerId') customerId: string,
  ) {
    return await this.service.attach(payMethId, customerId);
  }
}
