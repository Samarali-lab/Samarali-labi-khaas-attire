import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopClient } from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our complete collection of premium Pakistani clothing — lawn suits, kurtas, formals, and shalwar kameez.',
};

interface SearchParams {
  page?: string;
  category?: string;
  gender?: string;
  sort?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div className="container-brand py-20 text-center">Loading...</div>}>
      <ShopClient searchParams={searchParams} />
    </Suspense>
  );
}
