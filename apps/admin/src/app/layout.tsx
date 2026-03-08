import type { Metadata } from 'next';
import './globals.css';
import { AdminProviders } from './providers';

export const metadata: Metadata = {
  title: { template: '%s | KHAAS ATTIRE Admin', default: 'Admin Dashboard | KHAAS ATTIRE' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
