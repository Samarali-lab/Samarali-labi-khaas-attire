import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  DollarSign,
  Eye,
  Plus,
  Settings,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Khaas Attire admin dashboard.',
};

const STATS = [
  { label: 'Total Revenue', value: 'PKR 2,845,000', change: '+12%', icon: DollarSign, color: 'text-green-600' },
  { label: 'Total Orders', value: '1,247', change: '+8%', icon: ShoppingBag, color: 'text-blue-600' },
  { label: 'Customers', value: '892', change: '+15%', icon: Users, color: 'text-purple-600' },
  { label: 'Products', value: '74', change: '+3', icon: Package, color: 'text-brand-gold-dark' },
];

const RECENT_ORDERS = [
  { id: 'KA-001', customer: 'Sara Khan', total: 8500, status: 'DELIVERED', date: '2024-01-15' },
  { id: 'KA-002', customer: 'Fatima Ahmed', total: 35000, status: 'SHIPPED', date: '2024-01-16' },
  { id: 'KA-003', customer: 'Ayesha Malik', total: 4200, status: 'PROCESSING', date: '2024-01-17' },
  { id: 'KA-004', customer: 'Zara Hussain', total: 85000, status: 'PENDING', date: '2024-01-18' },
  { id: 'KA-005', customer: 'Maryam Iqbal', total: 7800, status: 'COD_PENDING', date: '2024-01-18' },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  COD_PENDING: 'bg-orange-100 text-orange-700',
};

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin header */}
      <div className="bg-brand-charcoal px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-playfair text-xl font-bold text-brand-gold">Khaas Attire</span>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            <Eye className="h-3 w-3" />
            View Store
          </Link>
          <div className="h-8 w-8 rounded-full bg-brand-maroon flex items-center justify-center text-sm font-bold text-white">
            A
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="hidden w-56 min-h-screen bg-white shadow-sm lg:block p-4" aria-label="Admin navigation">
          <ul className="space-y-1">
            {[
              { label: 'Dashboard', href: '/admin', icon: TrendingUp },
              { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
              { label: 'Products', href: '/admin/products', icon: Package },
              { label: 'Customers', href: '/admin/customers', icon: Users },
              { label: 'Settings', href: '/admin/settings', icon: Settings },
            ].map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                    href === '/admin'
                      ? 'bg-brand-ivory text-brand-maroon'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brand-maroon'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-brand-charcoal">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, Admin!</p>
            </div>
            <Link href="/admin/products/new" className="btn-primary !py-2 text-xs flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(({ label, value, change, icon: Icon, color }) => (
              <div key={label} className="bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {label}
                  </span>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <p className="font-playfair text-2xl font-bold text-brand-charcoal">{value}</p>
                <p className="mt-1 text-xs text-green-600 font-medium">{change} this month</p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-playfair text-lg font-semibold">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-brand-maroon hover:underline">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-brand-maroon">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-brand-charcoal">{order.customer}</td>
                      <td className="px-6 py-4 font-semibold text-brand-charcoal">
                        {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge text-xs ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{order.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs text-brand-maroon hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
