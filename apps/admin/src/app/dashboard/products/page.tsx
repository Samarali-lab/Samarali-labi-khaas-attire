'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  category: { name: string };
}

export default function AdminProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=50`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data || []);
        }
      } catch { /* no-op */ }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const accessToken = (session as { accessToken?: string })?.accessToken;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-brand-charcoal">Products</h1>
        <button className="bg-brand-maroon text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-opacity-90">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading products...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Product', 'SKU', 'Price', 'Category', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <div className="relative w-10 h-12 flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                            sizes="40px"
                          />
                        </div>
                      )}
                      <span className="text-sm font-medium text-brand-charcoal">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    Rs. {Number(product.price).toLocaleString('en-PK')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category?.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    No products yet. Add your first product!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
