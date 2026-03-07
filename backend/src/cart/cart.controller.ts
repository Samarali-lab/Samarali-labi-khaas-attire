import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';

interface OptionalAuthRequest {
  user?: { id: string };
}

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get the current cart' })
  getCart(
    @Request() req: OptionalAuthRequest,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.cartService.getCart(req.user?.id, sessionId);
  }

  @Post('items')
  @Version('1')
  @ApiOperation({ summary: 'Add an item to the cart' })
  addItem(
    @Request() req: OptionalAuthRequest,
    @Body() body: { productId: string; variantId?: string; quantity?: number },
    @Query('sessionId') sessionId?: string,
  ) {
    return this.cartService.addItem(
      req.user?.id,
      sessionId,
      body.productId,
      body.variantId,
      body.quantity ?? 1,
    );
  }

  @Patch('items/:itemId')
  @Version('1')
  @ApiOperation({ summary: 'Update cart item quantity' })
  updateItem(
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateItem(itemId, body.quantity);
  }

  @Delete('items/:itemId')
  @Version('1')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  removeItem(@Param('itemId') itemId: string) {
    return this.cartService.removeItem(itemId);
  }

  @Delete(':cartId/clear')
  @Version('1')
  @ApiOperation({ summary: 'Clear all items from the cart' })
  clearCart(@Param('cartId') cartId: string) {
    return this.cartService.clearCart(cartId);
  }
}
