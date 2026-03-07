import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton';

// Mock data for new arrivals (replace with API call in production)
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Crimson Rose Embroidered Shalwar Kameez',
    slug: 'crimson-rose-embroidered-shalwar-kameez',
    price: 8500,
    comparePrice: 11000,
    images: [],
    category: { name: 'Shalwar Kameez' },
    isNew: true,
  },
  {
    id: '2',
    name: 'Midnight Indigo Handwoven Kurta',
    slug: 'midnight-indigo-handwoven-kurta',
    price: 4200,
    comparePrice: 5500,
    images: [],
    category: { name: 'Kurta' },
    isNew: true,
  },
  {
    id: '3',
    name: 'Golden Zardozi Bridal Lehenga',
    slug: 'golden-zardozi-bridal-lehenga',
    price: 85000,
    comparePrice: 110000,
    images: [],
    category: { name: 'Lehenga' },
    isNew: false,
  },
  {
    id: '4',
    name: 'Cobalt Blue Hand-embroidered Party Kurta',
    slug: 'cobalt-blue-hand-embroidered-party-kurta',
    price: 6800,
    comparePrice: 8500,
    images: [],
    category: { name: 'Kurta' },
    isNew: true,
  },
];

function formatPKR(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(amount);
}

function ProductCard({ product }: { product: (typeof MOCK_PRODUCTS)[0] }) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link href={`/shop/${product.slug}`} className="card-product group block">
      {/* Image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory-dark">
        {/* Placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-ivory-dark to-gray-200 transition-transform duration-500 group-hover:scale-105" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="badge-new">New</span>
          )}
          {discount > 0 && (
            <span className="badge-sale">{discount}% off</span>
          )}
        </div>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-brand-maroon py-3 text-center text-xs font-semibold uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0">
          Quick View
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
          {product.category.name}
        </p>
        <h3 className="font-playfair text-base font-semibold leading-tight text-brand-charcoal line-clamp-2 group-hover:text-brand-maroon transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="price-current">{formatPKR(product.price)}</span>
          {product.comparePrice && (
            <span className="price-compare">{formatPKR(product.comparePrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function NewArrivals() {
  return (
    <section className="section-padding bg-white" aria-labelledby="new-arrivals-heading">
      <div className="container-brand">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Just In
            </p>
            <h2 id="new-arrivals-heading" className="heading-md">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brand-maroon"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
