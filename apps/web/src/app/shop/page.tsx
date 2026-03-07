import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import FilterSidebar from '@/components/shop/FilterSidebar';
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description:
    'Browse our full collection of premium Pakistani clothing — shalwar kameez, kurtas, lehengas, and more.',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

// Mock products for display
const MOCK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ['Crimson Rose Embroidered Shalwar Kameez', 'Midnight Indigo Kurta', 'Golden Zardozi Bridal Lehenga', 'Pearl White Dupatta'][i % 4] ?? 'Product',
  slug: `product-${i + 1}`,
  price: [8500, 4200, 85000, 2800, 7800, 2900, 35000, 5500, 6800, 3200, 4500, 9000][i] ?? 5000,
  comparePrice: [11000, 5500, 110000, 3500, 9500, null, 42000, 6800, 8500, 4000, null, 11000][i] ?? null,
  images: [],
  featured: i % 3 === 0,
  published: true,
  category: { id: '1', name: ['Shalwar Kameez', 'Kurta', 'Lehenga', 'Dupatta'][i % 4] ?? 'Clothing', slug: 'category', description: null, image: null, parentId: null },
  variants: [{ id: `v${i}`, productId: String(i), size: 'M', color: 'Crimson', stock: 10, sku: null }],
  sku: `SKU-${i}`,
  description: 'A beautiful piece of Pakistani clothing.',
  fabric: 'Cotton',
  careInstructions: 'Dry clean',
  gender: 'Women',
  categoryId: '1',
  collectionId: null,
  collection: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function ShopPage() {
  const totalProducts = MOCK_PRODUCTS.length;

  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-brand py-8">
          <nav className="breadcrumb mb-3" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-separator" aria-hidden="true">/</span>
            <span className="text-brand-charcoal font-medium">Shop</span>
          </nav>
          <h1 className="heading-lg">All Products</h1>
          <p className="mt-2 text-sm text-gray-500">{totalProducts} products</p>
        </div>
      </div>

      <div className="container-brand py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-60 flex-shrink-0 lg:block">
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
              <FilterSidebar />
            </Suspense>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-4">
              {/* Mobile filter button */}
              <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-maroon hover:text-brand-maroon transition-colors lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              {/* Sort */}
              <div className="ml-auto flex items-center gap-2">
                <label htmlFor="sort-select" className="text-sm text-gray-500">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    className="appearance-none border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-brand-charcoal focus:border-brand-maroon focus:outline-none"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Product grid */}
            <Suspense fallback={<ProductGridSkeleton count={12} />}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
                {MOCK_PRODUCTS.map((product) => (
                  <article key={product.id} className="card-product group">
                    <Link href={`/shop/${product.slug}`} className="block">
                      <div className="aspect-[3/4] overflow-hidden bg-brand-ivory-dark relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 transition-transform duration-500 group-hover:scale-105" />
                        {product.comparePrice && (
                          <span className="badge-sale absolute left-3 top-3">
                            {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% off
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                          {product.category.name}
                        </p>
                        <h3 className="font-playfair text-base font-semibold leading-tight text-brand-charcoal line-clamp-2 group-hover:text-brand-maroon transition-colors">
                          {product.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="price-current">
                            {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(product.price)}
                          </span>
                          {product.comparePrice && (
                            <span className="price-compare">
                              {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(product.comparePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </Suspense>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`flex h-10 w-10 items-center justify-center text-sm font-medium transition-colors ${
                    page === 1
                      ? 'bg-brand-maroon text-white'
                      : 'border border-gray-200 text-gray-600 hover:border-brand-maroon hover:text-brand-maroon'
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={page === 1 ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
