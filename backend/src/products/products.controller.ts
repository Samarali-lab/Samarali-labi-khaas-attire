import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all products with filters and pagination' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'collection', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, enum: ['newest', 'price-asc', 'price-desc', 'popular'] })
  findAll(
    @Query('category') category?: string,
    @Query('collection') collection?: string,
    @Query('gender') gender?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('featured') featured?: boolean,
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('sort') sort: 'newest' | 'price-asc' | 'price-desc' | 'popular' = 'newest',
  ) {
    return this.productsService.findAll({
      category,
      collection,
      gender,
      minPrice,
      maxPrice,
      featured,
      search,
      page: Number(page),
      limit: Number(limit),
      sort,
    });
  }

  @Get('featured')
  @Version('1')
  @ApiOperation({ summary: 'Get featured products' })
  findFeatured(@Query('limit') limit = 8) {
    return this.productsService.findFeatured(Number(limit));
  }

  @Get('categories')
  @Version('1')
  @ApiOperation({ summary: 'Get all categories' })
  findCategories() {
    return this.productsService.findCategories();
  }

  @Get('collections')
  @Version('1')
  @ApiOperation({ summary: 'Get all collections' })
  findCollections() {
    return this.productsService.findCollections();
  }

  @Get(':slug')
  @Version('1')
  @ApiOperation({ summary: 'Get a product by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post()
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  remove(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
