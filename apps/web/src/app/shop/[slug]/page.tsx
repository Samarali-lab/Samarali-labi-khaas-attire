import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Shield, Truck, RefreshCw, Heart, Share2 } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Mock product data - replace with actual API call
function getMockProduct(slug: string) {
  const products: Record<string, {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    comparePrice: number | null;
    description: string;
    fabric: string;
    careInstructions: string;
    images: string[];
    category: { name: string; slug: string };
    variants: { id: string; size: string; color: string; stock: number }[];
    rating: number;
    reviewCount: number;
  }> = {
    'crimson-rose-embroidered-shalwar-kameez': {
      id: '1',
      name: 'Crimson Rose Embroidered Shalwar Kameez',
      slug: 'crimson-rose-embroidered-shalwar-kameez',
      sku: 'SK-001',
      price: 8500,
      comparePrice: 11000,
      description: 'A breathtaking 3-piece shalwar kameez in deep crimson with intricate rose embroidery on the neckline and hem. Crafted from premium lawn fabric, this ensemble is perfect for family gatherings and festive occasions. The set includes a fully embroidered dupatta with scalloped edges.',
      fabric: '100% Pure Lawn',
      careInstructions: 'Dry clean recommended. If hand washing, use cold water and mild detergent. Do not tumble dry.',
      images: [],
      category: { name: 'Shalwar Kameez', slug: 'shalwar-kameez' },
      variants: [
        { id: 'v1', size: 'XS', color: 'Crimson', stock: 8 },
        { id: 'v2', size: 'S', color: 'Crimson', stock: 15 },
        { id: 'v3', size: 'M', color: 'Crimson', stock: 20 },
        { id: 'v4', size: 'L', color: 'Crimson', stock: 18 },
        { id: 'v5', size: 'XL', color: 'Crimson', stock: 12 },
        { id: 'v6', size: 'XXL', color: 'Crimson', stock: 6 },
      ],
      rating: 4.9,
      reviewCount: 47,
    },
  };
  return products[slug] ?? null;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getMockProduct(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Khaas Attire`,
      description: product.description.slice(0, 160),
      type: 'website',
    },
  };
}

function formatPKR(amount: number) {
  return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(amount);
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  // For the mock, show a product if slug matches; otherwise show generic
  const product = getMockProduct(slug) ?? {
    id: '1',
    name: 'Khaas Attire Product',
    slug,
    sku: 'KA-XXX',
    price: 5000,
    comparePrice: null,
    description: 'A beautiful piece of traditional Pakistani clothing crafted with premium fabrics and expert craftsmanship.',
    fabric: 'Premium Cotton',
    careInstructions: 'Dry clean recommended.',
    images: [],
    category: { name: 'Clothing', slug: 'shop' },
    variants: [
      { id: 'v1', size: 'S', color: 'Default', stock: 10 },
      { id: 'v2', size: 'M', color: 'Default', stock: 15 },
      { id: 'v3', size: 'L', color: 'Default', stock: 12 },
      { id: 'v4', size: 'XL', color: 'Default', stock: 8 },
    ],
    rating: 4.8,
    reviewCount: 24,
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];

  return (
    <div className="bg-brand-ivory min-h-screen">
      <div className="container-brand py-8">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/shop" className="breadcrumb-item">Shop</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/shop?category=${product.category.slug}`} className="breadcrumb-item">
            {product.category.name}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="text-brand-charcoal truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Images column */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="aspect-[3/4] overflow-hidden bg-brand-ivory-dark relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-brand-ivory-dark to-gray-200" />
              {discount > 0 && (
                <div className="absolute left-4 top-4">
                  <span className="badge-sale text-sm px-3 py-1">{discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <button
                  key={i}
                  className={`aspect-square overflow-hidden bg-brand-ivory-dark border-2 transition-colors ${i === 0 ? 'border-brand-maroon' : 'border-transparent hover:border-gray-300'}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                </button>
              ))}
            </div>
          </div>

          {/* Product details column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Category badge */}
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold hover:underline"
            >
              {product.category.name}
            </Link>

            {/* Product name */}
            <h1 className="heading-md mt-2 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-playfair text-3xl font-bold text-brand-maroon">
                {formatPKR(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPKR(product.comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="badge-sale">Save {discount}%</span>
              )}
            </div>

            {/* Color selection */}
            {colors.length > 1 && (
              <div className="mb-5">
                <p className="label-brand mb-2">
                  Color: <span className="font-normal text-gray-600">{colors[0]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="rounded-none border-2 border-brand-maroon px-4 py-1.5 text-sm font-medium text-brand-charcoal transition-colors hover:border-brand-maroon hover:text-brand-maroon"
                      aria-label={`Select color: ${color}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="label-brand">
                  Size: <span className="font-normal text-gray-600">{sizes[1]}</span>
                </p>
                <Link href="/size-guide" className="text-xs text-brand-maroon hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const variant = product.variants.find((v) => v.size === size);
                  const inStock = (variant?.stock ?? 0) > 0;
                  return (
                    <button
                      key={size}
                      disabled={!inStock}
                      className={`flex h-10 min-w-[2.5rem] items-center justify-center border-2 px-3 text-sm font-medium transition-colors ${
                        !inStock
                          ? 'cursor-not-allowed border-gray-100 text-gray-300 line-through'
                          : size === sizes[1]
                          ? 'border-brand-maroon bg-brand-maroon text-white'
                          : 'border-gray-200 text-brand-charcoal hover:border-brand-maroon'
                      }`}
                      aria-label={`Size ${size}${!inStock ? ' (out of stock)' : ''}`}
                      aria-pressed={size === sizes[1]}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mb-6 flex gap-3">
              <div className="flex items-center border border-gray-200">
                <button className="flex h-12 w-10 items-center justify-center text-gray-500 hover:bg-brand-ivory hover:text-brand-maroon transition-colors" aria-label="Decrease quantity">
                  −
                </button>
                <span className="flex h-12 w-10 items-center justify-center border-x border-gray-200 text-sm font-medium">
                  1
                </span>
                <button className="flex h-12 w-10 items-center justify-center text-gray-500 hover:bg-brand-ivory hover:text-brand-maroon transition-colors" aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button className="btn-primary flex-1">Add to Cart</button>
            </div>

            {/* Secondary actions */}
            <div className="mb-8 flex gap-3">
              <button className="btn-secondary flex-1">
                <Heart className="h-4 w-4" />
                Add to Wishlist
              </button>
              <button className="btn-icon border border-gray-200" aria-label="Share product">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'Orders above PKR 5,000' },
                { icon: Shield, label: 'Secure Payment', sub: 'Multiple options' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '7-day returns' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="mx-auto mb-1.5 h-5 w-5 text-brand-gold" />
                  <p className="text-xs font-semibold text-brand-charcoal">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>

            {/* Product details accordion */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-maroon">
                  Description
                  <span className="text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </details>
              <details className="group border-t border-gray-100 pt-3">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-maroon">
                  Fabric & Care
                  <span className="text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Care:</strong> {product.careInstructions}</p>
                </div>
              </details>
              <details className="group border-t border-gray-100 pt-3">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-maroon">
                  Shipping & Returns
                  <span className="text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p>Standard delivery: 3-5 business days (PKR 200)</p>
                  <p>Express delivery: 1-2 business days (PKR 500)</p>
                  <p>Free shipping on orders above PKR 5,000</p>
                  <p>Returns accepted within 7 days of delivery</p>
                </div>
              </details>
            </div>

            {/* SKU */}
            <p className="mt-6 text-xs text-gray-400">SKU: {product.sku}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
