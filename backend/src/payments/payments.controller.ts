import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('jazzcash/initiate')
  @Version('1')
  @ApiOperation({ summary: 'Initiate a JazzCash payment' })
  initiateJazzCash(
    @Body()
    body: {
      amount: number;
      orderId: string;
      description: string;
      mobileNumber: string;
    },
  ) {
    return this.paymentsService.initiateJazzCash(body);
  }

  @Post('easypaisa/initiate')
  @Version('1')
  @ApiOperation({ summary: 'Initiate an EasyPaisa payment' })
  initiateEasyPaisa(
    @Body()
    body: {
      amount: number;
      orderId: string;
      mobileNumber: string;
    },
  ) {
    return this.paymentsService.initiateEasyPaisa(body);
  }

  @Post('jazzcash/webhook')
  @Version('1')
  @ApiOperation({ summary: 'JazzCash payment webhook' })
  jazzCashWebhook(@Body() payload: Record<string, string>) {
    const verified = this.paymentsService.verifyJazzCashWebhook(payload);
    if (!verified) {
      return { success: false, message: 'Webhook verification failed' };
    }
    return { success: true };
  }

  @Get('discount/validate')
  @Version('1')
  @ApiOperation({ summary: 'Validate a discount code' })
  validateDiscount(
    @Query('code') code: string,
    @Query('orderTotal') orderTotal: string,
  ) {
    return this.paymentsService.validateDiscountCode(code, Number(orderTotal));
  }
}
