import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    name: 'Eid Collection',
    slug: '/collections/eid-collection-2024',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    description: 'Celebrate in style',
  },
  {
    name: 'Winter Formals',
    slug: '/collections/winter-formals-2024',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
    description: 'Warm & elegant',
  },
  {
    name: 'Everyday Lawn',
    slug: '/shop?category=lawn-suits',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
    description: 'Casual comfort',
  },
];

export function FeaturedCollections() {
  return (
    <section className="container-brand py-20">
      <div className="text-center mb-12">
        <p className="text-brand-gold tracking-[0.3em] uppercase text-sm font-medium mb-3">
          Curated For You
        </p>
        <h2 className="font-serif text-4xl font-bold text-brand-charcoal">
          Featured Collections
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link key={col.slug} href={col.slug} className="group relative overflow-hidden aspect-[3/4] block">
            <Image
              src={col.image}
              alt={col.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
              <p className="text-brand-gold text-xs uppercase tracking-widest mb-1">
                {col.description}
              </p>
              <h3 className="font-serif text-2xl font-bold">{col.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
