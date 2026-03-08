import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';

export const reviewRouter = Router();

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

/** Create review */
reviewRouter.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = reviewSchema.parse(req.body);

    // Check if user purchased this product
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId: data.productId,
        order: { userId: req.user!.id, status: 'DELIVERED' },
      },
    });

    if (!hasPurchased) {
      throw new AppError('You can only review products you have purchased', 403);
    }

    const review = await prisma.review.upsert({
      where: { userId_productId: { userId: req.user!.id, productId: data.productId } },
      update: { rating: data.rating, comment: data.comment, isApproved: false },
      create: { ...data, userId: req.user!.id },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
});

/** Get reviews for a product */
reviewRouter.get('/product/:productId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: req.params.productId, isApproved: true },
      include: { user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const avg = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({ success: true, data: { reviews, averageRating: avg, count: reviews.length } });
  } catch (error) {
    next(error);
  }
});

/** Approve review (Admin) */
reviewRouter.put('/:id/approve', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: { isApproved: true },
    });
    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
});
