import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white mt-20">
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-brand-gold mb-3">KHAAS ATTIRE</h3>
            <p className="text-gray-400 text-sm leading-relaxed italic mb-4">
              "Wear What Speaks."
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pakistan's premium clothing brand, crafting elegant and culturally rooted fashion
              for the modern Pakistani.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">Shop</h4>
            <ul className="space-y-2">
              {[
                { href: '/shop?gender=Women', label: "Women's Collection" },
                { href: '/shop?gender=Men', label: "Men's Collection" },
                { href: '/collections/eid-collection-2024', label: 'Eid Collection' },
                { href: '/collections/winter-formals-2024', label: 'Winter Formals' },
                { href: '/shop?sort=newest', label: 'New Arrivals' },
                { href: '/shop?featured=true', label: 'Featured' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">Info</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/size-guide', label: 'Size Guide' },
                { href: '/shipping-returns', label: 'Shipping & Returns' },
                { href: '/faq', label: 'FAQs' },
                { href: '/blog', label: 'Blog / Lookbook' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get 10% off your first order! Subscribe for exclusive deals and new arrivals.
            </p>
            <NewsletterForm />
            <p className="text-gray-500 text-xs mt-4">
              📍 Pakistan | Cash on Delivery Available
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KHAAS ATTIRE. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with ❤️ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
