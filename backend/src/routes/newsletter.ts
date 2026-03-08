import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const newsletterRouter = Router();

/** Subscribe to newsletter */
newsletterRouter.post('/subscribe', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    res.json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    next(error);
  }
});
