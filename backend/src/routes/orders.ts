import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

export const orderRouter = Router();

const createOrderSchema = z.object({
  addressId: z.string(),
  paymentMethod: z.enum(['JAZZCASH', 'EASYPAISA', 'STRIPE', 'COD']),
  discountCode: z.string().optional(),
  notes: z.string().optional(),
});

/** Get user's orders */
orderRouter.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, slug: true, images: true } },
            variant: true,
          },
        },
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
});

/** Get single order */
orderRouter.get('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        address: true,
        discountCode: true,
      },
    });

    if (!order) throw new AppError('Order not found', 404);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

/** Create order from cart */
orderRouter.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { addressId, paymentMethod, discountCode, notes } = createOrderSchema.parse(req.body);

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId: req.user!.id },
    });
    if (!address) throw new AppError('Address not found', 404);

    // Calculate subtotal
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    // Apply discount code
    let discount = 0;
    let discountCodeId: string | undefined;
    if (discountCode) {
      const code = await prisma.discountCode.findUnique({
        where: { code: discountCode },
      });
      if (code && code.isActive && (!code.expiresAt || code.expiresAt > new Date())) {
        if (!code.minOrderAmount || subtotal >= Number(code.minOrderAmount)) {
          discount = code.type === 'PERCENTAGE'
            ? subtotal * (Number(code.value) / 100)
            : Number(code.value);
          discountCodeId = code.id;
        }
      }
    }

    const shippingCost = subtotal >= 5000 ? 0 : 200;
    const total = subtotal - discount + shippingCost;

    // Generate order number using timestamp + UUID fragment to ensure uniqueness
    const orderNumber = `KA-${Date.now()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: req.user!.id,
          addressId,
          paymentMethod: paymentMethod as 'JAZZCASH' | 'EASYPAISA' | 'STRIPE' | 'COD',
          paymentStatus: paymentMethod === 'COD' ? 'COD_PENDING' : 'UNPAID',
          subtotal,
          discount,
          shippingCost,
          total,
          notes,
          discountCodeId,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.product.price,
              name: item.product.name,
              image: item.product.images[0] || null,
            })),
          },
        },
        include: { items: true, address: true },
      });

      // Update stock
      for (const item of cart.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Update discount code usage
      if (discountCodeId) {
        await tx.discountCode.update({
          where: { id: discountCodeId },
          data: { usedCount: { increment: 1 } },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});
