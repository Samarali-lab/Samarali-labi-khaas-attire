import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';

export const discountRouter = Router();

/** Validate discount code */
discountRouter.post('/validate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, orderAmount } = z.object({
      code: z.string(),
      orderAmount: z.number(),
    }).parse(req.body);

    const discount = await prisma.discountCode.findUnique({ where: { code } });

    if (!discount || !discount.isActive) {
      throw new AppError('Invalid discount code', 400);
    }

    if (discount.expiresAt && discount.expiresAt < new Date()) {
      throw new AppError('Discount code has expired', 400);
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      throw new AppError('Discount code usage limit reached', 400);
    }

    if (discount.minOrderAmount && orderAmount < Number(discount.minOrderAmount)) {
      throw new AppError(
        `Minimum order amount of Rs. ${discount.minOrderAmount} required`,
        400,
      );
    }

    const discountAmount = discount.type === 'PERCENTAGE'
      ? orderAmount * (Number(discount.value) / 100)
      : Number(discount.value);

    res.json({ success: true, data: { discount, discountAmount } });
  } catch (error) {
    next(error);
  }
});

/** Create discount code (Admin) */
discountRouter.post('/', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      code: z.string().min(3).max(20).toUpperCase(),
      type: z.enum(['PERCENTAGE', 'FIXED']),
      value: z.number().positive(),
      minOrderAmount: z.number().optional(),
      usageLimit: z.number().int().positive().optional(),
      expiresAt: z.string().datetime().optional(),
    });
    const data = schema.parse(req.body);
    const discountCode = await prisma.discountCode.create({ data });
    res.status(201).json({ success: true, data: discountCode });
  } catch (error) {
    next(error);
  }
});

/** Get all discount codes (Admin) */
discountRouter.get('/', authenticate, requireAdmin, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const codes = await prisma.discountCode.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: codes });
  } catch (error) {
    next(error);
  }
});
