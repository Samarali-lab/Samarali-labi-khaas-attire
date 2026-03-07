import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Pakistani Rupees (PKR)
 */
export function formatPKR(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage between original and sale price
 */
export function calculateDiscountPercent(
  originalPrice: number,
  salePrice: number,
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Truncate a string to a specified length with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}

/**
 * Generate a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format a date string into a readable Pakistani date format
 */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-PK', {
    ...defaultOptions,
    ...options,
  });
}

/**
 * Get the first image from a product images array with a fallback
 */
export function getProductImage(images: string[], index = 0): string {
  return images[index] ?? '/images/placeholder-product.jpg';
}

/**
 * Validate Pakistani phone number
 */
export function isValidPakistaniPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^(\+92|0092|92|0)(3\d{9})$/.test(cleaned);
}

/**
 * Format phone number to WhatsApp-compatible format (without +)
 */
export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (cleaned.startsWith('92')) return cleaned;
  if (cleaned.startsWith('0')) return '92' + cleaned.slice(1);
  return '92' + cleaned;
}

/**
 * Generate a WhatsApp link with a pre-filled message
 */
export function generateWhatsAppLink(
  phone: string,
  message: string,
): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Capitalize first letter of each word
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
}

/**
 * Get unique values from an array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Calculate cart totals
 */
export function calculateCartTotal(
  items: Array<{ price: number; quantity: number }>,
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Get available sizes from variants
 */
export function getAvailableSizes(
  variants: Array<{ size: string; stock: number }>,
): string[] {
  return unique(
    variants.filter((v) => v.stock > 0).map((v) => v.size),
  );
}

/**
 * Get available colors from variants, optionally filtered by size
 */
export function getAvailableColors(
  variants: Array<{ size: string; color: string; stock: number }>,
  selectedSize?: string,
): string[] {
  const filtered = selectedSize
    ? variants.filter((v) => v.size === selectedSize && v.stock > 0)
    : variants.filter((v) => v.stock > 0);
  return unique(filtered.map((v) => v.color));
}

/**
 * Check if a specific variant combination is in stock
 */
export function isVariantInStock(
  variants: Array<{ size: string; color: string; stock: number }>,
  size: string,
  color: string,
): boolean {
  const variant = variants.find((v) => v.size === size && v.color === color);
  return (variant?.stock ?? 0) > 0;
}
