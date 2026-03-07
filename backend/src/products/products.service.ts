import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import type { Product, Prisma } from '@prisma/client';

interface ProductFilters {
  category?: string;
  collection?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  search?: string;
  published?: boolean;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: ProductFilters = {}) {
    const {
      category,
      collection,
      gender,
      minPrice,
      maxPrice,
      featured,
      search,
      published = true,
      page = 1,
      limit = 20,
      sort = 'newest',
    } = filters;

    const where: Prisma.ProductWhereInput = {
      published,
      ...(featured !== undefined && { featured }),
      ...(gender && { gender }),
      ...(category && { category: { slug: category } }),
      ...(collection && { collection: { slug: collection } }),
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      sort === 'price-asc'
        ? { price: 'asc' }
        : sort === 'price-desc'
          ? { price: 'desc' }
          : { createdAt: 'desc' };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          collection: true,
          variants: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        collection: true,
        variants: true,
        reviews: {
          include: { user: { select: { id: true, name: true, image: true } } },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }

    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, collection: true, variants: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...dto,
        images: dto.images ?? [],
      },
      include: { category: true, collection: true, variants: true },
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);
    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: { category: true, collection: true, variants: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } });
  }

  async findFeatured(limit = 8) {
    return this.prisma.product.findMany({
      where: { featured: true, published: true },
      take: limit,
      include: { category: true, variants: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findCategories() {
    return this.prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findCollections() {
    return this.prisma.collection.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
