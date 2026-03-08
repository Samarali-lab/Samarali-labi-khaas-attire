import { getServerSession } from 'next-auth';
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle } from 'lucide-react';

interface DashboardStats {
  totalRevenue: number;
  ordersToday: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  lowStockVariants: Array<{ id: string; sku: string; stock: number; product: { name: string } }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    user: { name: string | null; email: string | null };
    items: Array<{ id: string }>;
  }>;
}

async function getStats(accessToken: string): Promise<DashboardStats | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const session = await getServerSession();
  const accessToken = (session as { accessToken?: string })?.accessToken || '';
  const stats = await getStats(accessToken);

  const statCards = [
    { icon: DollarSign, label: 'Total Revenue', value: `Rs. ${Number(stats?.totalRevenue || 0).toLocaleString('en-PK')}`, color: 'text-green-600 bg-green-50' },
    { icon: ShoppingBag, label: 'Orders Today', value: stats?.ordersToday || 0, color: 'text-blue-600 bg-blue-50' },
    { icon: Users, label: 'Total Customers', value: stats?.totalCustomers || 0, color: 'text-purple-600 bg-purple-50' },
    { icon: Package, label: 'Total Products', value: stats?.totalProducts || 0, color: 'text-orange-600 bg-orange-50' },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    PROCESSING: 'bg-blue-100 text-blue-700',
    SHIPPED: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-charcoal mb-8">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-brand-charcoal">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-charcoal">Recent Orders</h2>
            {stats?.pendingOrders ? (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                {stats.pendingOrders} pending
              </span>
            ) : null}
          </div>
          {stats?.recentOrders?.length ? (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium">#{order.orderNumber}</p>
                    <p className="text-gray-500 text-xs">{order.user?.name || order.user?.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Rs. {Number(order.total).toLocaleString('en-PK')}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No orders yet.</p>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-orange-500" />
            <h2 className="font-semibold text-brand-charcoal">Low Stock Alerts</h2>
          </div>
          {stats?.lowStockVariants?.length ? (
            <div className="space-y-3">
              {stats.lowStockVariants.map((variant) => (
                <div key={variant.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium">{variant.product.name}</p>
                    <p className="text-gray-500 text-xs">SKU: {variant.sku}</p>
                  </div>
                  <span className="font-bold text-red-600">{variant.stock} left</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">✅ All products are well-stocked.</p>
          )}
        </div>
      </div>
    </div>
  );
}
