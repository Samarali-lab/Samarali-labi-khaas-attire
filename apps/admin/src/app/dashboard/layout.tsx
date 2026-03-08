import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Settings } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
    redirect('/login');
  }

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/orders', icon: ShoppingBag, label: 'Orders' },
    { href: '/dashboard/products', icon: Package, label: 'Products' },
    { href: '/dashboard/customers', icon: Users, label: 'Customers' },
    { href: '/dashboard/discounts', icon: Tag, label: 'Discounts' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-charcoal text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-bold text-brand-gold text-lg">KHAAS ATTIRE</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm mb-1"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">Admin</span>
            <Link href="/api/auth/signout" className="text-red-500 hover:underline">Sign Out</Link>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
