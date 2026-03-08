'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  images: string[];
  variants: ProductVariant[];
}

interface ProductCardProps {
  product: Product;
}

/** Single product card with quick add to cart */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const compareAtPrice = product.compareAtPrice
    ? typeof product.compareAtPrice === 'string'
      ? parseFloat(product.compareAtPrice)
      : product.compareAtPrice
    : null;
  const isOnSale = compareAtPrice && compareAtPrice > price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const firstVariant = product.variants?.[0];
    if (firstVariant) {
      addItem({
        id: firstVariant.id,
        productId: product.id,
        variantId: firstVariant.id,
        name: product.name,
        price,
        image: product.images[0] || '',
        size: firstVariant.size,
        color: firstVariant.color,
        quantity: 1,
      });
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        {isOnSale && (
          <span className="absolute top-2 left-2 bg-brand-maroon text-white text-xs px-2 py-1 font-medium">
            SALE
          </span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-white text-brand-charcoal py-2 text-xs font-medium flex items-center justify-center gap-1 hover:bg-brand-maroon hover:text-white transition-colors"
          >
            <ShoppingCart size={14} />
            Quick Add
          </button>
          <button className="bg-white p-2 hover:bg-brand-maroon hover:text-white transition-colors">
            <Heart size={14} />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-brand-charcoal line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-brand-maroon">
            Rs. {price.toLocaleString('en-PK')}
          </span>
          {isOnSale && (
            <span className="text-gray-400 text-sm line-through">
              Rs. {compareAtPrice.toLocaleString('en-PK')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
