import { Router, Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

export const paymentRouter = Router();

/** Create Stripe payment intent */
paymentRouter.post('/stripe/intent', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });

    const { orderId } = req.body;
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: req.user!.id },
    });

    if (!order) throw new AppError('Order not found', 404);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.total) * 100), // Convert to paisa/cents
      currency: 'pkr',
      metadata: { orderId, orderNumber: order.orderNumber },
    });

    res.json({ success: true, data: { clientSecret: paymentIntent.client_secret } });
  } catch (error) {
    next(error);
  }
});

/** Stripe webhook handler */
paymentRouter.post(
  '/stripe/webhook',
  // Raw body needed for webhook verification
  (req, _res, next) => {
    (req as Request & { rawBody?: Buffer }).rawBody = req.body as Buffer;
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2023-10-16',
      });

      const sig = req.headers['stripe-signature'] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(
          (req as Request & { rawBody?: Buffer }).rawBody || req.body,
          sig,
          webhookSecret,
        );
      } catch {
        throw new AppError('Webhook signature verification failed', 400);
      }

      if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent;
        const orderId = intent.metadata.orderId;

        await prisma.order.update({
          where: { id: orderId },
          data: { paymentStatus: 'PAID', paymentRef: intent.id },
        });
      }

      res.json({ received: true });
    } catch (error) {
      next(error);
    }
  },
);

/** Initiate JazzCash payment */
paymentRouter.post('/jazzcash/initiate', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.body;
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: req.user!.id },
    });
    if (!order) throw new AppError('Order not found', 404);

    // JazzCash payment initiation would go here
    // This requires JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_INTEGRITY_SALT
    res.json({
      success: true,
      data: {
        message: 'JazzCash payment integration requires merchant credentials',
        orderId,
        amount: order.total,
      },
    });
  } catch (error) {
    next(error);
  }
});
