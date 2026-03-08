import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';

async function getNewArrivals() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?sort=newest&limit=8`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function NewArrivals() {
  const products = await getNewArrivals();

  return (
    <section className="container-brand py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-brand-gold tracking-[0.3em] uppercase text-sm font-medium mb-3">
            Just Arrived
          </p>
          <h2 className="font-serif text-4xl font-bold text-brand-charcoal">New Arrivals</h2>
        </div>
        <Link href="/shop?sort=newest" className="text-sm text-brand-maroon hover:underline font-medium">
          View All →
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: Parameters<typeof ProductCard>[0]['product']) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No products available yet.</p>
        </div>
      )}
    </section>
  );
}
