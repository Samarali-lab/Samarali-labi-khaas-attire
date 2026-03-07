import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Khaas Attire — Dress to Express',
    template: '%s | Khaas Attire',
  },
  description:
    'Discover premium Pakistani clothing — shalwar kameez, kurtas, lehengas, and more. Authentic craftsmanship meets contemporary design. Shop now with free shipping on orders above PKR 5,000.',
  keywords: [
    'Pakistani clothing',
    'shalwar kameez',
    'kurta',
    'lehenga',
    'Pakistani fashion',
    'online shopping Pakistan',
    'Khaas Attire',
    'traditional wear',
    'formal wear Pakistan',
  ],
  authors: [{ name: 'Khaas Attire', url: 'https://khaasattire.pk' }],
  creator: 'Khaas Attire',
  publisher: 'Khaas Attire',
  formatDetection: { telephone: false },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://khaasattire.pk',
  ),
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://khaasattire.pk',
    siteName: 'Khaas Attire',
    title: 'Khaas Attire — Dress to Express',
    description:
      'Premium Pakistani clothing with authentic craftsmanship and contemporary design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Khaas Attire — Premium Pakistani Clothing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khaas Attire — Dress to Express',
    description:
      'Premium Pakistani clothing with authentic craftsmanship and contemporary design.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#2C2C2C',
              color: '#FAF7F2',
              borderRadius: '0px',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: {
                primary: '#C9A84C',
                secondary: '#FAF7F2',
              },
            },
            error: {
              iconTheme: {
                primary: '#800020',
                secondary: '#FAF7F2',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
