import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

export const adminRouter = Router();

// All admin routes require authentication and admin role
adminRouter.use(authenticate, requireAdmin);

/** Get dashboard stats */
adminRouter.get('/dashboard', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalRevenue,
      ordersToday,
      totalCustomers,
      totalProducts,
      pendingOrders,
      lowStockVariants,
      recentOrders,
    ] = await Promise.all([
      prisma.order.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { total: true },
      }),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.productVariant.findMany({
        where: { stock: { lte: 5 } },
        include: { product: { select: { id: true, name: true } } },
        take: 10,
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: { select: { id: true } },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue._sum.total || 0,
        ordersToday,
        totalCustomers,
        totalProducts,
        pendingOrders,
        lowStockVariants,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
});

/** Get all orders (admin) */
adminRouter.get('/orders', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;

    const where = status ? { status: status as 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED' } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true, phone: true } },
          address: true,
          items: { include: { product: { select: { name: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

/** Update order status (admin) */
adminRouter.put('/orders/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status,
        ...(trackingNumber && { trackingNumber }),
        ...(status === 'DELIVERED' && { paymentStatus: 'PAID' }),
      },
    });
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

/** Get all customers (admin) */
adminRouter.get('/customers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: 'CUSTOMER' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, name: true, email: true, phone: true, createdAt: true,
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
    ]);

    res.json({
      success: true,
      data: customers,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});
