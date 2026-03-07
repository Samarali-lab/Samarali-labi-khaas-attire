import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivals from '@/components/home/NewArrivals';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export const metadata: Metadata = {
  title: 'Khaas Attire — Dress to Express',
  description:
    'Discover premium Pakistani clothing — shalwar kameez, kurtas, lehengas, and more. Authentic craftsmanship meets contemporary design.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <NewArrivals />

      {/* Brand story banner */}
      <section className="bg-brand-charcoal bg-pattern py-20 text-center">
        <div className="container-brand max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-gold">
            Our Philosophy
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Where Tradition Meets Contemporary Grace
          </h2>
          <div className="gold-divider mb-8" />
          <p className="font-inter text-lg leading-relaxed text-gray-300">
            Khaas Attire was born from a deep reverence for Pakistan&apos;s rich
            textile heritage. Every thread, every stitch, every embroidered
            motif tells a story — of skilled artisans, of centuries-old
            techniques, and of a culture that has always dressed with intention.
          </p>
          <a href="/about" className="btn-gold mt-8 inline-flex">
            Our Story
          </a>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
