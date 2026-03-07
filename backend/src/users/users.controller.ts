import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

interface AuthRequest {
  user: { id: string };
}

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Version('1')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req: AuthRequest) {
    return this.usersService.findById(req.user.id);
  }

  @Patch('profile')
  @Version('1')
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(
    @Request() req: AuthRequest,
    @Body() body: { name?: string; phone?: string; image?: string },
  ) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Get('addresses')
  @Version('1')
  @ApiOperation({ summary: 'Get user addresses' })
  getAddresses(@Request() req: AuthRequest) {
    return this.usersService.getAddresses(req.user.id);
  }

  @Post('addresses')
  @Version('1')
  @ApiOperation({ summary: 'Add a new address' })
  createAddress(
    @Request() req: AuthRequest,
    @Body()
    body: {
      name: string;
      phone: string;
      address: string;
      city: string;
      province: string;
      postalCode?: string;
      isDefault?: boolean;
    },
  ) {
    return this.usersService.createAddress(req.user.id, body);
  }

  @Delete('addresses/:id')
  @Version('1')
  @ApiOperation({ summary: 'Delete an address' })
  deleteAddress(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.usersService.deleteAddress(id, req.user.id);
  }

  @Get('wishlist')
  @Version('1')
  @ApiOperation({ summary: 'Get user wishlist' })
  getWishlist(@Request() req: AuthRequest) {
    return this.usersService.getWishlist(req.user.id);
  }

  @Post('wishlist/:productId')
  @Version('1')
  @ApiOperation({ summary: 'Toggle product in wishlist' })
  toggleWishlist(
    @Request() req: AuthRequest,
    @Param('productId') productId: string,
  ) {
    return this.usersService.toggleWishlist(req.user.id, productId);
  }
}
