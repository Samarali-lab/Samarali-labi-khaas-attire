import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

export const cartRouter = Router();

const addToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive().default(1),
});

const getCart = async (userId: string | undefined, sessionId: string | undefined) => {
  if (!userId && !sessionId) throw new AppError('Cart identifier required', 400);

  const where = userId ? { userId } : { sessionId };
  let cart = await prisma.cart.findFirst({
    where,
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true, name: true, slug: true, images: true, price: true, compareAtPrice: true,
            },
          },
          variant: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: userId ? { userId } : { sessionId },
      include: { items: { include: { product: true, variant: true } } },
    });
  }

  return cart;
};

/** Get cart */
cartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'] as string;
    const cart = await getCart(userId, sessionId);
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
});

/** Add item to cart */
cartRouter.post('/items', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'] as string;
    const { productId, variantId, quantity } = addToCartSchema.parse(req.body);

    // Check stock
    const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!variant || variant.stock < quantity) {
      throw new AppError('Insufficient stock', 400);
    }

    const cart = await getCart(userId, sessionId);

    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId: cart.id, variantId } },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, variantId, quantity },
      });
    }

    const updatedCart = await getCart(userId, sessionId);
    res.json({ success: true, data: updatedCart });
  } catch (error) {
    next(error);
  }
});

/** Update cart item quantity */
cartRouter.put('/items/:itemId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = z.object({ quantity: z.number().int().min(0) }).parse(req.body);

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: req.params.itemId } });
    } else {
      await prisma.cartItem.update({
        where: { id: req.params.itemId },
        data: { quantity },
      });
    }

    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    next(error);
  }
});

/** Remove item from cart */
cartRouter.delete('/items/:itemId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.cartItem.delete({ where: { id: req.params.itemId } });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

/** Clear cart */
cartRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'] as string;
    const cart = await getCart(userId, sessionId);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
});
