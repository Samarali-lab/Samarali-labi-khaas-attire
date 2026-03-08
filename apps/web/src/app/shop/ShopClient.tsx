'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ui/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  variants: Array<{ id: string; size: string; color: string; stock: number }>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SearchParams {
  page?: string;
  category?: string;
  gender?: string;
  sort?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

export function ShopClient({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchParams.page) params.set('page', searchParams.page);
      if (searchParams.category) params.set('category', searchParams.category);
      if (searchParams.gender) params.set('gender', searchParams.gender);
      if (searchParams.sort) params.set('sort', searchParams.sort);
      if (searchParams.search) params.set('search', searchParams.search);
      if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
      if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
      params.set('limit', '12');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || []);
        setPagination(data.pagination || null);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilter = (key: string, value: string) => {
    const current = new URLSearchParams(sp.toString());
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    current.delete('page');
    router.push(`/shop?${current.toString()}`);
  };

  return (
    <div className="container-brand py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-charcoal">
            {searchParams.gender || 'All'} Products
          </h1>
          {pagination && (
            <p className="text-gray-500 text-sm mt-1">
              {pagination.total} products found
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <select
            value={searchParams.sort || 'newest'}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-brand-maroon"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm hover:border-brand-maroon transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {filterOpen && (
        <div className="bg-white border border-gray-200 p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Gender
            </label>
            <select
              value={searchParams.gender || ''}
              onChange={(e) => updateFilter('gender', e.target.value)}
              className="w-full border border-gray-300 px-2 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Min Price (Rs.)
            </label>
            <input
              type="number"
              value={searchParams.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              placeholder="0"
              className="w-full border border-gray-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Max Price (Rs.)
            </label>
            <input
              type="number"
              value={searchParams.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              placeholder="50000"
              className="w-full border border-gray-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Search
            </label>
            <input
              type="text"
              value={searchParams.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 px-2 py-2 text-sm"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4]" />
              <div className="mt-3 space-y-2">
                <div className="bg-gray-200 h-4 rounded w-3/4" />
                <div className="bg-gray-200 h-4 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No products found matching your filters.</p>
          <button onClick={() => router.push('/shop')} className="mt-4 btn-outline">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: pagination.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => updateFilter('page', String(i + 1))}
              className={`w-10 h-10 text-sm font-medium transition-colors ${
                pagination.page === i + 1
                  ? 'bg-brand-maroon text-white'
                  : 'border border-gray-300 hover:border-brand-maroon'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
