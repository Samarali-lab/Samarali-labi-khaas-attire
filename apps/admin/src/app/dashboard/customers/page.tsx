import { getServerSession } from 'next-auth';

interface Customer {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  _count: { orders: number };
}

async function getCustomers(accessToken: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/customers?limit=50`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function AdminCustomersPage() {
  const session = await getServerSession();
  const accessToken = (session as { accessToken?: string })?.accessToken || '';
  const customers: Customer[] = await getCustomers(accessToken);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-charcoal mb-8">
        Customers ({customers.length})
      </h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Name', 'Email', 'Phone', 'Orders', 'Joined'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{customer.name || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.email || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.phone || '—'}</td>
                <td className="px-6 py-4 text-sm font-medium text-brand-maroon">
                  {customer._count.orders}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(customer.createdAt).toLocaleDateString('en-PK')}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">No customers yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
