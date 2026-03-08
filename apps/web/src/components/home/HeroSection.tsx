'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    title: 'Eid Collection 2024',
    subtitle: 'Dress for every celebration',
    cta: 'Shop Now',
    href: '/collections/eid-collection-2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80',
    title: "Women's Lawn Collection",
    subtitle: 'Premium lawn suits for every occasion',
    cta: 'Explore',
    href: '/shop?gender=Women&category=lawn-suits',
  },
  {
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80',
    title: "Men's Kurtas",
    subtitle: 'Timeless elegance, modern fit',
    cta: 'Shop Men',
    href: '/shop?gender=Men',
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover transition-opacity duration-1000"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div>
          <p className="text-brand-gold font-medium tracking-[0.3em] uppercase text-sm mb-4">
            New Collection
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">{slide.subtitle}</p>
          <Link href={slide.href} className="btn-primary inline-block text-base px-10 py-4">
            {slide.cta}
          </Link>
        </div>
      </div>
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
