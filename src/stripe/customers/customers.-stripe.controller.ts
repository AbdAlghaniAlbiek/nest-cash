import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersStripeService } from './customers-stripe.service';
import {
  CreateCustomerStripeDto,
  UpdateCustomerStripeDto,
} from './customer-stripe.dto';

@Controller('customers')
export class CustomersStripeController {
  constructor(private service: CustomersStripeService) {}

  @Post()
  async create(@Body() data: CreateCustomerStripeDto) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') customerId: string,
    @Body() data: UpdateCustomerStripeDto,
  ) {
    return await this.service.update(customerId, data);
  }

  @Delete(':id')
  async delete(@Param('id') customerId: string) {
    return await this.service.delete(customerId);
  }

  @Get(':id')
  async getOne(@Param('id') customerId: string) {
    return await this.service.getOne(customerId);
  }

  @Get()
  async getAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('startAfter') startAfter: string,
  ) {
    return await this.service.getAll(limit ?? 10, startAfter);
  }
}
