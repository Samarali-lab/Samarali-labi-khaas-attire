import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BrandStory } from '@/components/home/BrandStory';
import { Testimonials } from '@/components/home/Testimonials';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';

export const metadata: Metadata = {
  title: 'KHAAS ATTIRE — Wear What Speaks.',
  description: "Pakistan's premium clothing brand. Discover our exclusive collection of lawn suits, kurtas, formals, and shalwar kameez.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BrandStory />
      <NewArrivals />
      <Testimonials />
      <NewsletterBanner />
    </>
  );
}
