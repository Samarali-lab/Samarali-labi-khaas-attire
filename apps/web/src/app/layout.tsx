import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    template: '%s | KHAAS ATTIRE',
    default: 'KHAAS ATTIRE — Wear What Speaks.',
  },
  description:
    "Pakistan's premium clothing brand. Discover our exclusive collection of lawn suits, kurtas, formals, and shalwar kameez.",
  keywords: ['Pakistani clothing', 'lawn suits', 'kurta', 'shalwar kameez', 'KHAAS ATTIRE', 'Pakistan fashion'],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://khaasattire.com',
    siteName: 'KHAAS ATTIRE',
    title: 'KHAAS ATTIRE — Wear What Speaks.',
    description: "Pakistan's premium clothing brand.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'KHAAS ATTIRE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KHAAS ATTIRE',
    description: "Pakistan's premium clothing brand.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
