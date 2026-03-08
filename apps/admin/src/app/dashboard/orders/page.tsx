import { getServerSession } from 'next-auth';

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  user: { name: string | null; email: string | null };
  items: Array<{ id: string }>;
}

async function getOrders(accessToken: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?limit=50`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function AdminOrdersPage() {
  const session = await getServerSession();
  const accessToken = (session as { accessToken?: string })?.accessToken || '';
  const orders: Order[] = await getOrders(accessToken);

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    PROCESSING: 'bg-blue-100 text-blue-700',
    SHIPPED: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-charcoal mb-8">Orders</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-brand-maroon">#{order.orderNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.user?.name || order.user?.email || 'Guest'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items.length}</td>
                <td className="px-6 py-4 text-sm font-medium">Rs. {Number(order.total).toLocaleString('en-PK')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.paymentMethod}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-PK')}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
