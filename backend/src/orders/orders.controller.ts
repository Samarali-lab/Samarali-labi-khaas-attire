import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import type { PaymentMethod } from '@prisma/client';

interface CreateOrderBody {
  paymentMethod: PaymentMethod;
  addressId?: string;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
    name: string;
    image?: string;
    size?: string;
    color?: string;
  }>;
  shipping?: number;
  discount?: number;
  discountCode?: string;
  notes?: string;
}

interface AuthRequest {
  user: { id: string; role: string };
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new order' })
  create(@Body() body: CreateOrderBody, @Request() req: { user?: AuthRequest['user'] }) {
    return this.ordersService.create({
      ...body,
      userId: req.user?.id,
    });
  }

  @Get('my')
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get orders for the authenticated user' })
  findMyOrders(@Request() req: AuthRequest) {
    return this.ordersService.findByUser(req.user.id);
  }

  @Get(':id')
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific order by ID' })
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.findById(id, req.user.id);
  }

  @Get('track/:orderNumber')
  @Version('1')
  @ApiOperation({ summary: 'Track an order by order number (public)' })
  trackOrder(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.findByOrderNumber(orderNumber);
  }

  @Patch(':id/status')
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; trackingNumber?: string },
  ) {
    return this.ordersService.updateStatus(id, body.status, body.trackingNumber);
  }
}
