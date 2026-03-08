import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth';
import { productRouter } from './routes/products';
import { categoryRouter } from './routes/categories';
import { cartRouter } from './routes/cart';
import { orderRouter } from './routes/orders';
import { userRouter } from './routes/users';
import { adminRouter } from './routes/admin';
import { reviewRouter } from './routes/reviews';
import { discountRouter } from './routes/discounts';
import { uploadRouter } from './routes/upload';
import { newsletterRouter } from './routes/newsletter';
import { paymentRouter } from './routes/payments';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.NEXTAUTH_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:3001',
  ],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/discounts', discountRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/payments', paymentRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 KHAAS ATTIRE API running on port ${PORT}`);
});

export default app;
