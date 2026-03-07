'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPKR } from '@/lib/utils';
import { SHIPPING } from '@/lib/constants';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalItems, getSubtotal, clearCart } =
    useCartStore();

  const subtotal = getSubtotal();
  const shippingFee = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardFee;
  const total = subtotal + shippingFee;
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-screen">
        <div className="container-brand py-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-ivory-dark">
              <ShoppingBag className="h-10 w-10 text-brand-maroon" />
            </div>
          </div>
          <h1 className="heading-md mb-4">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-500">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/shop" className="btn-primary">
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen">
      <div className="container-brand py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <nav className="breadcrumb mb-2" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb-item">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="text-brand-charcoal">Cart</span>
            </nav>
            <h1 className="heading-lg">Shopping Cart</h1>
            <p className="mt-1 text-sm text-gray-500">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6">
              {items.map((item) => (
                <article key={`${item.productId}-${item.variantId}`} className="flex gap-4 border-b border-gray-100 py-5 last:border-0">
                  {/* Image */}
                  <Link href={`/shop/${item.product.slug}`} className="flex-shrink-0">
                    <div className="h-28 w-24 bg-brand-ivory-dark" />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-playfair text-base font-semibold text-brand-charcoal hover:text-brand-maroon transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="mt-0.5 text-xs text-gray-500">
                            {item.variant.size && `Size: ${item.variant.size}`}
                            {item.variant.size && item.variant.color && ' · '}
                            {item.variant.color && `Color: ${item.variant.color}`}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-brand-ivory hover:text-brand-maroon transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-8 min-w-[2rem] items-center justify-center border-x border-gray-200 text-sm font-medium px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-brand-ivory hover:text-brand-maroon transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-semibold text-brand-maroon">
                          {formatPKR(item.product.price * item.quantity)}
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
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-4">
              <Link href="/shop" className="flex items-center gap-2 text-sm text-brand-maroon hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6">
              <h2 className="heading-sm mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                  </span>
                </div>
                {subtotal < SHIPPING.freeThreshold && (
                  <p className="text-xs text-green-600">
                    Add {formatPKR(SHIPPING.freeThreshold - subtotal)} more to get free shipping!
                  </p>
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-playfair text-xl font-bold text-brand-maroon">
                      {formatPKR(total)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">Including taxes</p>
                </div>
              </div>

              {/* Discount code */}
              <div className="mt-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="input-brand flex-1 !py-2 text-sm"
                    aria-label="Discount code"
                  />
                  <button className="btn-secondary !px-4 !py-2 !text-xs">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout button */}
              <Link href="/checkout" className="btn-primary mt-5 w-full text-center">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Payment methods */}
              <div className="mt-5 text-center">
                <p className="mb-2 text-xs text-gray-400">Secure checkout with</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['COD', 'JazzCash', 'EasyPaisa', 'Visa'].map((m) => (
                    <span key={m} className="rounded-sm border border-gray-200 px-2 py-1 text-xs text-gray-500">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
