'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { cn, formatPKR, calculateDiscountPercent } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const discount = product.comparePrice
    ? calculateDiscountPercent(product.comparePrice, product.price)
    : 0;

  const firstVariant = product.variants[0] ?? null;
  const isOutOfStock = product.variants.every((v) => v.stock === 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product, firstVariant);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <article className={cn('card-product group', className)}>
      <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory-dark">
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 transition-transform duration-500 group-hover:scale-105" />

          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.featured && !isOutOfStock && (
              <span className="badge-new" aria-label="New arrival">New</span>
            )}
            {discount > 0 && (
              <span className="badge-sale" aria-label={`${discount}% off`}>
                {discount}% off
              </span>
            )}
            {isOutOfStock && (
              <span className="badge-sold-out">Sold Out</span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={cn(
              'absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 hover:scale-110',
              inWishlist ? 'text-brand-maroon' : 'text-gray-400 hover:text-brand-maroon',
            )}
            aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={inWishlist}
          >
            <Heart
              className="h-4 w-4"
              fill={inWishlist ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          </button>

          {/* Quick add overlay */}
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-center justify-center gap-2 bg-brand-maroon py-3 text-xs font-semibold uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0"
              aria-label={`Quick add ${product.name} to cart`}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Quick Add
            </button>
          )}
        </div>

        {/* Product info */}
        <div className="p-4">
          {product.category && (
            <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
              {product.category.name}
            </p>
          )}
          <h3 className="font-playfair text-base font-semibold leading-tight text-brand-charcoal line-clamp-2 group-hover:text-brand-maroon transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="price-current">{formatPKR(product.price)}</span>
            {product.comparePrice && (
              <span className="price-compare">{formatPKR(product.comparePrice)}</span>
            )}
          </div>

          {/* Color dots */}
          {product.variants.length > 0 && (
            <div className="mt-2 flex items-center gap-1" aria-label="Available colors">
              {[...new Set(product.variants.map((v) => v.color))]
                .slice(0, 4)
                .map((color) => (
                  <span
                    key={color}
                    className="h-3 w-3 rounded-full border border-gray-200 bg-gray-300"
                    title={color}
                    aria-label={color}
                  />
                ))}
              {[...new Set(product.variants.map((v) => v.color))].length > 4 && (
                <span className="text-xs text-gray-400">
                  +{[...new Set(product.variants.map((v) => v.color))].length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
