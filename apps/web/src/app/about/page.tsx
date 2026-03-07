import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Khaas Attire — a Pakistani clothing brand celebrating artisanal craftsmanship and contemporary design.',
};

export default function AboutPage() {
  return (
    <div className="bg-brand-ivory">
      {/* Hero */}
      <section className="bg-brand-charcoal py-20 text-center">
        <div className="container-brand max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Our Story
          </p>
          <h1 className="heading-xl text-white">About Khaas Attire</h1>
          <div className="gold-divider mt-6" />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-brand max-w-4xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <div className="aspect-square bg-brand-ivory-dark" />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Where It All Began
              </p>
              <h2 className="heading-md mb-5">Rooted in Heritage, Designed for Today</h2>
              <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                  Khaas Attire was founded with a single vision: to create clothing that honours
                  Pakistan&apos;s magnificent textile heritage while appealing to the sensibilities
                  of the modern Pakistani woman and man.
                </p>
                <p>
                  We partner directly with skilled artisans across Pakistan — from the master
                  embroiderers of Multan to the khaddar weavers of Faisalabad — ensuring that
                  every piece carries the authentic mark of traditional craftsmanship.
                </p>
                <p>
                  Our name, &quot;Khaas&quot; (meaning &quot;special&quot; or &quot;exclusive&quot; in Urdu), reflects our
                  commitment to creating garments that are truly extraordinary — pieces that
                  make you feel as special as the occasion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-brand">
          <div className="mb-12 text-center">
            <h2 className="heading-lg mb-4">Our Values</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '🧵',
                title: 'Authentic Craftsmanship',
                description:
                  'Every stitch, every embroidered motif is the work of skilled artisan hands, preserving centuries of Pakistani textile traditions.',
              },
              {
                icon: '💎',
                title: 'Premium Quality',
                description:
                  'We source only the finest fabrics — pure lawn, georgette, silk, and khaddar — to ensure lasting beauty and comfort.',
              },
              {
                icon: '🌿',
                title: 'Sustainable Practices',
                description:
                  'We are committed to responsible sourcing and supporting fair wages for the artisans who bring our designs to life.',
              },
              {
                icon: '❤️',
                title: 'Community First',
                description:
                  'By choosing Khaas Attire, you support local craftspeople and their families, keeping traditional arts alive.',
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="font-playfair text-lg font-semibold text-brand-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-ivory-dark text-center">
        <div className="container-brand max-w-2xl">
          <h2 className="heading-md mb-4">Ready to Experience Khaas?</h2>
          <p className="mb-8 text-gray-600">
            Browse our collections and find the perfect piece for every occasion.
          </p>
          <Link href="/shop" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
