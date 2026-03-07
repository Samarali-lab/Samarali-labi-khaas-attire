import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-brand-charcoal" aria-label="Hero">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-pattern opacity-30" aria-hidden="true" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/80 to-transparent"
        aria-hidden="true"
      />

      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-maroon-dark/40 via-brand-charcoal to-brand-charcoal"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex min-h-[85vh] items-center">
        <div className="container-brand">
          <div className="max-w-2xl animate-slide-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-brand-gold">
              New Collection 2024
            </p>

            <h1 className="font-playfair text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Dressed in{' '}
              <span className="text-gradient-gold">Khaas</span>{' '}
              <br className="hidden sm:block" />
              Tradition
            </h1>

            <div className="my-6 h-0.5 w-16 bg-brand-gold" aria-hidden="true" />

            <p className="text-lg leading-relaxed text-gray-300 sm:text-xl">
              Discover Pakistan&apos;s finest clothing — where centuries of artisanal
              craftsmanship meets modern design sensibility. Each piece tells a story
              worth wearing.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-gold group">
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/shop?sort=newest" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-brand-charcoal">
                New Arrivals
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
              {[
                { label: 'Premium Fabrics', icon: '✦' },
                { label: 'Free Delivery', icon: '✦' },
                { label: 'Easy Returns', icon: '✦' },
                { label: 'COD Available', icon: '✦' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="text-brand-gold text-xs">{badge.icon}</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
