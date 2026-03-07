'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { NAV_LINKS, BRAND } from '@/lib/constants';

const CATEGORIES = [
  { label: 'Shalwar Kameez', href: '/shop?category=shalwar-kameez' },
  { label: 'Kurta', href: '/shop?category=kurta' },
  { label: 'Lehenga', href: '/shop?category=lehenga' },
  { label: 'Dupatta & Scarves', href: '/shop?category=dupatta' },
  { label: 'Kids Wear', href: '/shop?category=kids-wear' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopMenuOpen, setShopMenuOpen] = useState(false);

  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-maroon py-2 text-center text-xs font-medium tracking-widest text-white uppercase">
        Free shipping on orders above PKR 5,000 &nbsp;|&nbsp; COD Available
        Nationwide
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-sm'
            : 'bg-brand-ivory',
        )}
      >
        <div className="container-brand">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Mobile menu toggle */}
            <button
              className="btn-icon lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-playfair text-2xl font-bold tracking-wider text-brand-maroon lg:text-3xl">
                {BRAND.name.split(' ')[0]}{' '}
                <span className="text-brand-gold">{BRAND.name.split(' ')[1]}</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.label === 'Shop' ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setShopMenuOpen(true)}
                    onMouseLeave={() => setShopMenuOpen(false)}
                  >
                    <button
                      className={cn(
                        'nav-link flex items-center gap-1',
                        pathname.startsWith('/shop') && 'text-brand-maroon',
                      )}
                      aria-haspopup="true"
                      aria-expanded={shopMenuOpen}
                    >
                      Shop
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          shopMenuOpen && 'rotate-180',
                        )}
                      />
                    </button>
                    {shopMenuOpen && (
                      <div className="absolute left-0 top-full z-50 w-52 bg-white shadow-brand-lg py-2">
                        <Link
                          href="/shop"
                          className="block px-4 py-2.5 text-sm text-brand-charcoal hover:bg-brand-ivory hover:text-brand-maroon transition-colors"
                        >
                          All Products
                        </Link>
                        <div className="my-1 border-t border-gray-100" />
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="block px-4 py-2.5 text-sm text-brand-charcoal hover:bg-brand-ivory hover:text-brand-maroon transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'nav-link',
                      pathname === link.href.split('?')[0] &&
                        'text-brand-maroon',
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                className="btn-icon"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link href="/account" className="btn-icon relative" aria-label={`Wishlist (${wishlistCount} items)`}>
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-white">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link href="/account" className="btn-icon hidden sm:flex" aria-label="My account">
                <User className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="btn-icon relative ml-1"
                aria-label={`Shopping cart (${cartItemCount} items)`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-maroon text-[10px] font-bold text-white">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white py-4">
            <div className="container-brand">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for shalwar kameez, kurtas, lehengas..."
                  className="input-brand flex-1"
                  autoFocus
                  aria-label="Search products"
                />
                <button type="submit" className="btn-primary !px-6">
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="btn-icon border border-gray-200"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-6 shadow-xl animate-slide-in-right"
            aria-label="Mobile navigation"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-playfair text-xl font-bold text-brand-maroon">
                Khaas <span className="text-brand-gold">Attire</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="btn-icon"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-3 text-sm font-medium uppercase tracking-widest transition-colors hover:text-brand-maroon',
                      pathname === link.href.split('?')[0]
                        ? 'text-brand-maroon'
                        : 'text-brand-charcoal',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Categories
              </p>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="block py-2.5 text-sm text-brand-charcoal transition-colors hover:text-brand-maroon"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <Link
                href="/account"
                className="flex items-center gap-2 py-2 text-sm text-brand-charcoal hover:text-brand-maroon"
              >
                <User className="h-4 w-4" /> My Account
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 py-2 text-sm text-brand-charcoal hover:text-brand-maroon"
              >
                <Heart className="h-4 w-4" /> Wishlist{' '}
                {wishlistCount > 0 && (
                  <span className="ml-auto rounded-full bg-brand-maroon px-2 py-0.5 text-xs text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
