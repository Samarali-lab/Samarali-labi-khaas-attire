import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Key } from 'lucide-react';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login?redirect=/account');

  const links = [
    { href: '/account/orders', icon: Package, label: 'My Orders', desc: 'View and track your orders' },
    { href: '/account/wishlist', icon: Heart, label: 'Wishlist', desc: 'Your saved items' },
    { href: '/account/addresses', icon: MapPin, label: 'Addresses', desc: 'Manage delivery addresses' },
    { href: '/account/password', icon: Key, label: 'Change Password', desc: 'Update your password' },
  ];

  return (
    <div className="container-brand py-10">
      <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-2">My Account</h1>
      <p className="text-gray-500 mb-10">Welcome back, {session.user?.name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-brand-ivory rounded-full flex items-center justify-center mb-4">
            <User size={28} className="text-brand-maroon" />
          </div>
          <h3 className="font-serif text-lg font-bold">{session.user?.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{session.user?.email}</p>
        </div>
        {links.map((link) => (
          <Link key={link.href} href={link.href}
            className="bg-white border border-gray-100 p-6 flex flex-col items-center text-center hover:border-brand-maroon hover:shadow-sm transition-all group">
            <div className="w-16 h-16 bg-brand-ivory rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors">
              <link.icon size={28} className="text-brand-maroon" />
            </div>
            <h3 className="font-medium text-brand-charcoal">{link.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
