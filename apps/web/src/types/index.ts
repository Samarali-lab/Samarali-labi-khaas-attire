export type Role = 'CUSTOMER' | 'ADMIN';

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'COD_PENDING';

export type PaymentMethod = 'JAZZCASH' | 'EASYPAISA' | 'STRIPE' | 'COD';

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  role: Role;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string | null;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  children?: Category[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  featured: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
  sku: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  fabric: string | null;
  careInstructions: string | null;
  price: number;
  comparePrice: number | null;
  images: string[];
  featured: boolean;
  published: boolean;
  gender: string | null;
  categoryId: string | null;
  collectionId: string | null;
  category: Category | null;
  collection: Collection | null;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string | null;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  notes: string | null;
  items: OrderItem[];
  address: Address | null;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string | null;
  body: string;
  verified: boolean;
  createdAt: string;
  user: Pick<User, 'id' | 'name' | 'image'>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  image: string | null;
  published: boolean;
  createdAt: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  description: string | null;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrder: number | null;
  active: boolean;
}

// ─── Store types ─────────────────────────────────────────────

export interface CartStoreItem {
  productId: string;
  variantId: string | null;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

// ─── API Response types ───────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ─── Filter types ─────────────────────────────────────────────

export interface ProductFilters {
  category?: string;
  collection?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  search?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular';
  page?: number;
  limit?: number;
}

// ─── Checkout types ───────────────────────────────────────────

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  discountCode?: string;
}
