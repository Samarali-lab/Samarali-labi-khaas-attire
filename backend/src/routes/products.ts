import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';

export const productRouter = Router();

const productQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  category: z.string().optional(),
  collection: z.string().optional(),
  gender: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  search: z.string().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc', 'popular']).default('newest'),
  featured: z.coerce.boolean().optional(),
});

/** Get all products with filtering, sorting, pagination */
productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = productQuerySchema.parse(req.query);
    const skip = (query.page - 1) * query.limit;

    const where: Record<string, unknown> = { isActive: true };

    if (query.category) where.category = { slug: query.category };
    if (query.collection) where.collection = { slug: query.collection };
    if (query.gender) where.gender = query.gender;
    if (query.featured !== undefined) where.isFeatured = query.featured;

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) (where.price as Record<string, number>).gte = query.minPrice;
      if (query.maxPrice !== undefined) (where.price as Record<string, number>).lte = query.maxPrice;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const orderBy: Record<string, unknown> =
      query.sort === 'price_asc' ? { price: 'asc' }
      : query.sort === 'price_desc' ? { price: 'desc' }
      : { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          collection: { select: { id: true, name: true, slug: true } },
          variants: true,
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

/** Get single product by slug */
productRouter.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        collection: true,
        variants: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { id: true, name: true, image: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) throw new AppError('Product not found', 404);

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

/** Create product (Admin only) */
productRouter.post('/', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
      include: { category: true, collection: true, variants: true },
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

/** Update product (Admin only) */
productRouter.put('/:id', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
      include: { category: true, collection: true, variants: true },
    });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

/** Delete product (Admin only) */
productRouter.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});
