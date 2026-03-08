import Image from 'next/image';
import Link from 'next/link';

export function BrandStory() {
  return (
    <section className="bg-white py-20">
      <div className="container-brand">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1594938298603-c8148c4b4f04?w=700&q=80"
              alt="KHAAS ATTIRE - Made in Pakistan"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-brand-gold tracking-[0.3em] uppercase text-sm font-medium mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-4xl font-bold text-brand-charcoal mb-6">
              Rooted in Pakistan,<br />Made for the World
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KHAAS ATTIRE was born from a love of Pakistani culture and craftsmanship. 
              Every thread, every stitch, every embroidery tells a story of our heritage — 
              rich, vibrant, and eternally elegant.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We craft premium clothing that honors Pakistan's textile traditions while 
              embracing modern sensibilities. From intricate hand embroidery to luxurious 
              lawn fabrics — KHAAS ATTIRE is for those who refuse to compromise on quality.
            </p>
            <div className="flex gap-8 mb-8">
              <div>
                <div className="font-serif text-3xl font-bold text-brand-maroon">500+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-brand-maroon">10k+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-brand-maroon">100%</div>
                <div className="text-sm text-gray-500">Made in Pakistan</div>
              </div>
            </div>
            <Link href="/about" className="btn-outline inline-block">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
