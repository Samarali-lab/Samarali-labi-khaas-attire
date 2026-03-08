'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const cartCount = useCartStore((state) => state.items.length);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/shop?gender=Women', label: 'Women' },
    { href: '/shop?gender=Men', label: 'Men' },
    { href: '/collections/eid-collection-2024', label: 'Eid Collection' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-ivory border-b border-gray-200 shadow-sm">
      <div className="container-brand">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-brand-maroon tracking-wider">
            KHAAS ATTIRE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-charcoal hover:text-brand-maroon transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/shop?search=true" className="hover:text-brand-maroon transition-colors">
              <Search size={20} />
            </Link>
            {session ? (
              <>
                <Link href="/account/wishlist" className="hover:text-brand-maroon transition-colors">
                  <Heart size={20} />
                </Link>
                <Link href="/cart" className="relative hover:text-brand-maroon transition-colors">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-maroon text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="hover:text-brand-maroon transition-colors">
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 rounded hidden group-hover:block">
                    <Link href="/account" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50">
                      <User size={16} /> My Account
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50">
                      Orders
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 w-full text-left text-red-600"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/cart" className="relative hover:text-brand-maroon transition-colors">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-maroon text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link href="/auth/login" className="btn-primary text-sm px-4 py-2">
                  Login
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium border-b border-gray-100 last:border-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
