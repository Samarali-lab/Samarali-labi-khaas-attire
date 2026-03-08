import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  password: z.string().min(8),
}).refine((data) => data.email || data.phone, {
  message: 'Either email or phone is required',
});

const loginSchema = z.object({
  identifier: z.string(), // email or phone
  password: z.string(),
});

/** Register a new user */
authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash,
      },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new AppError('JWT secret not configured', 500);

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    );

    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
});

/** Login user */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });

    if (!user || !user.passwordHash) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new AppError('JWT secret not configured', 500);

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    );

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: { user: userWithoutPassword, token } });
  } catch (error) {
    next(error);
  }
});

/** Get current user profile */
authRouter.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true, name: true, email: true, phone: true, role: true,
        image: true, createdAt: true,
      },
    });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});
