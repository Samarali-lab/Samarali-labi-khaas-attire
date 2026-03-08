import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { authenticate, requireAdmin } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const uploadRouter = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

/** Upload image to Cloudinary */
uploadRouter.post(
  '/image',
  authenticate,
  requireAdmin,
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new AppError('No file uploaded', 400);

      const result = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: 'khaas-attire', resource_type: 'image' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as { secure_url: string; public_id: string });
              },
            )
            .end(req.file!.buffer);
        },
      );

      res.json({
        success: true,
        data: { url: result.secure_url, publicId: result.public_id },
      });
    } catch (error) {
      next(error);
    }
  },
);
