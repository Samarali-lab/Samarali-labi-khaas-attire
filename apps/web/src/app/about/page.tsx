import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about KHAAS ATTIRE's story, values, and commitment to Pakistani fashion.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 bg-brand-charcoal flex items-center justify-center text-white text-center">
        <div>
          <p className="text-brand-gold tracking-[0.3em] text-sm uppercase mb-3">Our Story</p>
          <h1 className="font-serif text-5xl font-bold">About KHAAS ATTIRE</h1>
        </div>
      </section>

      <div className="container-brand py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-6">
              Rooted in Heritage, Crafted for Today
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KHAAS ATTIRE was founded with one vision: to bring the finest Pakistani clothing craftsmanship 
              to modern wardrobes — both in Pakistan and across the globe.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe that fashion is an expression of identity. Pakistani clothing is not just fabric — 
              it is art, heritage, and culture woven together. Every piece we create is a celebration 
              of our rich textile tradition.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From intricate embroidery to premium lawn fabrics, from classic shalwar kameez to contemporary 
              formals — KHAAS ATTIRE curates clothing that speaks for itself.
            </p>
          </div>
          <div className="relative aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80"
              alt="KHAAS ATTIRE Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-brand-charcoal text-white p-10 mb-16">
          {[
            { title: 'Our Mission', text: 'To make premium Pakistani fashion accessible to everyone, everywhere.' },
            { title: 'Our Vision', text: 'A world where Pakistani craftsmanship is celebrated globally.' },
            { title: 'Our Values', text: 'Quality, authenticity, cultural pride, and customer delight.' },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-serif text-xl font-bold text-brand-gold mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-brand-gold tracking-[0.3em] text-sm uppercase mb-3">Made in Pakistan</p>
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-6">
            🇵🇰 Proudly Pakistani
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every single product at KHAAS ATTIRE is designed, crafted, and made in Pakistan. 
            We work with skilled artisans and reputable textile manufacturers across Lahore, 
            Faisalabad, and Karachi — supporting local talent and industry.
          </p>
        </div>
      </div>
    </div>
  );
}
