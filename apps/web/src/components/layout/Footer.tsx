import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { BRAND, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Main footer content */}
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-playfair text-2xl font-bold">
                Khaas{' '}
                <span className="text-brand-gold">Attire</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              {BRAND.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={BRAND.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-gray-400 transition-all hover:border-brand-gold hover:text-brand-gold"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={BRAND.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-gray-400 transition-all hover:border-brand-gold hover:text-brand-gold"
                aria-label="Follow on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={BRAND.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-gray-400 transition-all hover:border-brand-gold hover:text-brand-gold"
                aria-label="Follow on TikTok"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Shop
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.customer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-gold" />
                <span className="text-sm text-gray-400">{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-brand-gold" />
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-brand-gold" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>

            {/* Payment methods */}
            <div className="mt-6">
              <p className="mb-3 text-xs text-gray-500 uppercase tracking-wider">
                We Accept
              </p>
              <div className="flex flex-wrap gap-2">
                {['COD', 'JazzCash', 'EasyPaisa', 'Visa', 'Mastercard'].map(
                  (method) => (
                    <span
                      key={method}
                      className="rounded-sm border border-gray-600 px-2 py-1 text-xs text-gray-400"
                    >
                      {method}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-brand flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {FOOTER_LINKS.company.slice(-2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 transition-colors hover:text-gray-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
