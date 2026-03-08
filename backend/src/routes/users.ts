import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

export const userRouter = Router();

const addressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10).max(15),
  street: z.string().min(5),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string().min(4),
  isDefault: z.boolean().default(false),
});

/** Update user profile */
userRouter.put('/profile', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      name: z.string().min(2).max(100).optional(),
      phone: z.string().min(10).max(15).optional(),
    });
    const data = schema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
      select: { id: true, name: true, email: true, phone: true, image: true },
    });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

/** Change password */
userRouter.put('/password', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8),
    });
    const { currentPassword, newPassword } = schema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user || !user.passwordHash) throw new AppError('User not found', 404);

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) throw new AppError('Current password is incorrect', 400);

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: req.user!.id }, data: { passwordHash } });

    res.json({ success: true, message: 'Password updated' });
  } catch (error) {
    next(error);
  }
});

/** Get user addresses */
userRouter.get('/addresses', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user!.id },
      orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
    });
    res.json({ success: true, data: addresses });
  } catch (error) {
    next(error);
  }
});

/** Add address */
userRouter.post('/addresses', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = addressSchema.parse(req.body);

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user!.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: { ...data, userId: req.user!.id },
    });
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
});

/** Update address */
userRouter.put('/addresses/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = addressSchema.parse(req.body);

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user!.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id: req.params.id, userId: req.user!.id },
      data,
    });
    res.json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
});

/** Delete address */
userRouter.delete('/addresses/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.address.delete({ where: { id: req.params.id, userId: req.user!.id } });
    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
});

/** Get wishlist */
userRouter.get('/wishlist', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: {
            product: {
              include: { variants: true, category: true },
            },
          },
        },
      },
    });
    res.json({ success: true, data: wishlist?.items || [] });
  } catch (error) {
    next(error);
  }
});

/** Toggle wishlist item */
userRouter.post('/wishlist/:productId', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: req.user!.id },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: req.user!.id },
      });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: { wishlistId: wishlist.id, productId: req.params.productId },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      res.json({ success: true, message: 'Removed from wishlist', inWishlist: false });
    } else {
      await prisma.wishlistItem.create({
        data: { wishlistId: wishlist.id, productId: req.params.productId },
      });
      res.json({ success: true, message: 'Added to wishlist', inWishlist: true });
    }
  } catch (error) {
    next(error);
  }
});
