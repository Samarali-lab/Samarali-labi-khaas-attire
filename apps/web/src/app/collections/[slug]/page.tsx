import type { Metadata } from 'next';
import { ProductCard } from '@/components/ui/ProductCard';

async function getProducts(collection: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?collection=${collection}&limit=24`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return { title: name };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts(slug);
  const name = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="container-brand py-10">
      <div className="text-center mb-12">
        <p className="text-brand-gold tracking-[0.3em] text-sm uppercase mb-3">Collection</p>
        <h1 className="font-serif text-4xl font-bold text-brand-charcoal">{name}</h1>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>No products in this collection yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: Parameters<typeof ProductCard>[0]['product']) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
