'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayesha Khan',
    location: 'Lahore, Pakistan',
    rating: 5,
    text: 'Absolutely stunning quality! I ordered the embroidered lawn suit for Eid and received so many compliments. The fabric feels luxurious and the embroidery is exquisite.',
    urdu: 'بہت خوبصورت',
  },
  {
    name: 'Fatima Ali',
    location: 'Karachi, Pakistan',
    rating: 5,
    text: 'KHAAS ATTIRE never disappoints. The stitching is perfect and delivery was on time. Their cash on delivery option made it so convenient.',
    urdu: 'شاندار',
  },
  {
    name: 'Zara Ahmed',
    location: 'Dubai, UAE (Pakistani Diaspora)',
    rating: 5,
    text: 'Living abroad, I miss Pakistani fashion. KHAAS ATTIRE brings that authentic Pakistani craftsmanship right to my door. Simply beautiful!',
    urdu: 'بہترین',
  },
  {
    name: 'Omar Sheikh',
    location: 'Islamabad, Pakistan',
    rating: 5,
    text: 'Bought a formal kurta for my wedding. The quality is exceptional — exactly what you would expect from a premium brand. Highly recommended!',
    urdu: 'لاجواب',
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="bg-brand-charcoal text-white py-20">
      <div className="container-brand text-center">
        <p className="text-brand-gold tracking-[0.3em] uppercase text-sm font-medium mb-4">
          What Our Customers Say
        </p>
        <h2 className="font-serif text-4xl font-bold mb-12">Customer Reviews</h2>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={20} fill="#C9A84C" color="#C9A84C" />
            ))}
          </div>
          <p className="text-xl leading-relaxed italic mb-2">"{t.text}"</p>
          <p className="text-brand-gold text-2xl font-serif mb-4">{t.urdu}</p>
          <div className="text-gray-400">
            <p className="font-medium text-white">{t.name}</p>
            <p className="text-sm">{t.location}</p>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === active ? 'bg-brand-gold w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
