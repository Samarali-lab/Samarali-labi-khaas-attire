'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatPKR } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import type { CartStoreItem } from '@/types';

interface CartItemProps {
  item: CartStoreItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    updateQuantity(item.productId, item.variantId, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.productId, item.variantId, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.productId, item.variantId);
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <article className="flex gap-4 border-b border-gray-100 py-5">
      {/* Product image */}
      <Link
        href={`/shop/${item.product.slug}`}
        className="flex-shrink-0"
        aria-label={`View ${item.product.name}`}
      >
        <div className="h-24 w-20 bg-brand-ivory-dark transition-opacity hover:opacity-80" />
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-4">
          <div>
            <Link
              href={`/shop/${item.product.slug}`}
              className="font-playfair text-sm font-semibold text-brand-charcoal hover:text-brand-maroon transition-colors line-clamp-2"
            >
              {item.product.name}
            </Link>
            {(item.variant?.size ?? item.variant?.color) && (
              <p className="mt-1 text-xs text-gray-500">
                {item.variant?.size && (
                  <span>Size: {item.variant.size}</span>
                )}
                {item.variant?.size && item.variant?.color && (
                  <span className="mx-1">·</span>
                )}
                {item.variant?.color && (
                  <span>Color: {item.variant.color}</span>
                )}
              </p>
            )}
          </div>
          <button
            onClick={handleRemove}
            className="flex-shrink-0 text-gray-400 transition-colors hover:text-red-500"
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Quantity and price */}
        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div
            className="flex items-center rounded-none border border-gray-200"
            role="group"
            aria-label={`Quantity for ${item.product.name}`}
          >
            <button
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:bg-brand-ivory hover:text-brand-maroon disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" aria-hidden="true" />
            </button>
            <span
              className="flex h-8 min-w-[2.5rem] items-center justify-center border-x border-gray-200 text-sm font-medium text-brand-charcoal"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:bg-brand-ivory hover:text-brand-maroon"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-semibold text-brand-maroon">
              {formatPKR(itemTotal)}
            </span>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-400">
                {formatPKR(item.product.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
