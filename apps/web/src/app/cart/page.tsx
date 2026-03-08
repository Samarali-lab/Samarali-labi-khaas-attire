'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const sub = subtotal();
  const shipping = sub >= 5000 ? 0 : 200;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="container-brand py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add some beautiful pieces to your cart.</p>
        <Link href="/shop" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-brand py-10">
      <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-10">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-6 p-4 bg-white border border-gray-100">
              <div className="relative w-24 aspect-[3/4] flex-shrink-0 bg-gray-100">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                )}
              </div>
              <div className="flex-1">
                <Link href={`/product/${item.productId}`} className="font-medium hover:text-brand-maroon">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="font-semibold text-brand-maroon mt-2">
                  Rs. {item.price.toLocaleString('en-PK')}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="font-semibold text-right text-brand-charcoal">
                Rs. {(item.price * item.quantity).toLocaleString('en-PK')}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-gray-100 p-6 sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rs. {sub.toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `Rs. ${shipping.toLocaleString('en-PK')}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Free shipping on orders over Rs. 5,000
                </p>
              )}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-brand-maroon">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <Link href="/checkout" className="btn-primary w-full text-center mt-6 block py-4">
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="btn-outline w-full text-center mt-3 block py-3 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
