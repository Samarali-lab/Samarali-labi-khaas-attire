import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  loading = false,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-5xl" aria-hidden="true">🧵</div>
        <h3 className="font-playfair text-xl font-semibold text-brand-charcoal">
          {emptyMessage}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters or search term.
        </p>
        <a href="/shop" className="btn-primary mt-6">
          View All Products
        </a>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      role="list"
      aria-label={`${products.length} products`}
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
