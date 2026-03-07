import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Khaas Attire account, orders, and preferences.',
};

const ACCOUNT_MENU = [
  { icon: Package, label: 'My Orders', href: '/account/orders', description: 'Track and manage your orders' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist', description: 'Items you love' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses', description: 'Manage delivery addresses' },
  { icon: Settings, label: 'Account Settings', href: '/account/settings', description: 'Update your profile and password' },
];

export default function AccountPage() {
  const isLoggedIn = false; // Replace with actual auth check

  if (!isLoggedIn) {
    return (
      <div className="bg-brand-ivory min-h-screen">
        <div className="container-brand py-8">
          <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="text-brand-charcoal">Account</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Login */}
            <div className="bg-white p-8">
              <h2 className="heading-sm mb-2">Sign In</h2>
              <p className="mb-6 text-sm text-gray-500">
                Welcome back! Sign in to access your orders and wishlist.
              </p>
              <Link href="/account/login" className="btn-primary w-full text-center block">
                Sign In
              </Link>
            </div>
            {/* Register */}
            <div className="bg-white p-8">
              <h2 className="heading-sm mb-2">Create Account</h2>
              <p className="mb-6 text-sm text-gray-500">
                New to Khaas Attire? Create an account for faster checkout and exclusive offers.
              </p>
              <Link href="/account/register" className="btn-secondary w-full text-center block">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen">
      <div className="container-brand py-8">
        <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="text-brand-charcoal">Account</span>
        </nav>

        {/* Account header */}
        <div className="mb-8 flex items-center gap-4 bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-maroon text-xl font-bold text-white">
            S
          </div>
          <div>
            <h1 className="font-playfair text-xl font-bold text-brand-charcoal">Sara Khan</h1>
            <p className="text-sm text-gray-500">sara@example.com</p>
          </div>
          <button className="ml-auto flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Account menu */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACCOUNT_MENU.map(({ icon: Icon, label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white p-6 shadow-sm hover:shadow-brand transition-all duration-300"
            >
              <Icon className="mb-3 h-6 w-6 text-brand-gold" />
              <h3 className="font-semibold text-brand-charcoal group-hover:text-brand-maroon transition-colors">
                {label}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            </Link>
          ))}
        </div>

        {/* Recent orders preview */}
        <div className="mt-8 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-playfair text-lg font-semibold">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-brand-maroon hover:underline">
              View All
            </Link>
          </div>
          <div className="text-center py-10 text-gray-400">
            <Package className="mx-auto mb-2 h-8 w-8" />
            <p className="text-sm">No orders yet. Start shopping!</p>
            <Link href="/shop" className="btn-primary mt-4 text-sm inline-flex">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
