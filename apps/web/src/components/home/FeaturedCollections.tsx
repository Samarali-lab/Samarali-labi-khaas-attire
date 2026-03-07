import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    name: 'Eid Collection 2024',
    slug: 'eid-collection-2024',
    description: 'Celebrate in brilliance',
    image: '/images/collections/eid-2024.jpg',
    itemCount: '24 pieces',
    bgColor: 'from-brand-maroon-dark to-brand-maroon',
  },
  {
    name: 'Bridal Formals',
    slug: 'bridal-formals',
    description: 'For your most special day',
    image: '/images/collections/bridal-formals.jpg',
    itemCount: '18 pieces',
    bgColor: 'from-brand-charcoal to-brand-charcoal-light',
  },
  {
    name: 'Everyday Classics',
    slug: 'everyday-classics',
    description: 'Effortless elegance',
    image: '/images/collections/everyday-classics.jpg',
    itemCount: '32 pieces',
    bgColor: 'from-brand-gold-dark to-brand-gold',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="section-padding bg-brand-ivory-dark" aria-labelledby="collections-heading">
      <div className="container-brand">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Curated For You
          </p>
          <h2 id="collections-heading" className="heading-lg mb-4">
            Featured Collections
          </h2>
          <div className="gold-divider" />
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COLLECTIONS.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/shop?collection=${collection.slug}`}
              className="group relative overflow-hidden"
              style={{ '--collection-index': index } as React.CSSProperties}
            >
              {/* Image placeholder with gradient */}
              <div
                className={`aspect-[3/4] w-full bg-gradient-to-b ${collection.bgColor} relative`}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 bg-pattern opacity-20" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                      {collection.itemCount}
                    </span>
                    <h3 className="mt-1 font-playfair text-2xl font-bold text-white">
                      {collection.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {collection.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/shop?view=collections" className="btn-secondary">
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
