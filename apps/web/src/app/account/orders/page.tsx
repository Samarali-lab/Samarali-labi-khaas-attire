import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login?redirect=/account/orders');

  let orders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
    items: Array<{ id: string }>;
  }> = [];
  try {
    const accessToken = (session as { accessToken?: string }).accessToken;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      orders = data.data || [];
    }
  } catch { /* no-op */ }

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    PROCESSING: 'bg-blue-100 text-blue-700',
    SHIPPED: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    REFUNDED: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="container-brand py-10">
      <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 p-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-brand-charcoal">#{order.orderNumber}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-PK')} · {order.items.length} item(s)
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-bold text-brand-maroon">
                  Rs. {Number(order.total).toLocaleString('en-PK')}
                </p>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
