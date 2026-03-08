'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { PAKISTAN_PROVINCES, PAKISTAN_CITIES } from '@khaas-attire/shared';
import { CheckCircle } from 'lucide-react';

type Step = 'shipping' | 'payment' | 'review';
type PaymentMethod = 'COD' | 'JAZZCASH' | 'EASYPAISA' | 'STRIPE';

interface ShippingForm {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    province: 'Punjab',
    postalCode: '',
  });

  const sub = subtotal();
  const shipping = sub >= 5000 ? 0 : 200;
  const total = sub + shipping;

  const selectedProvince = shippingForm.province as keyof typeof PAKISTAN_CITIES;
  const cities = PAKISTAN_CITIES[selectedProvince] || [];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    if (!session) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    setLoading(true);
    try {
      const accessToken = (session as { accessToken?: string }).accessToken;
      
      // First create address
      const addressRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...shippingForm, isDefault: false }),
      });

      if (!addressRes.ok) throw new Error('Failed to save address');
      const addressData = await addressRes.json();

      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          addressId: addressData.data.id,
          paymentMethod,
          discountCode: discountCode || undefined,
          cartItems: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!orderRes.ok) throw new Error('Failed to place order');
      const orderData = await orderRes.json();
      setOrderNumber(orderData.data.orderNumber);
      clearCart();
      setStep('review');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'review' && orderNumber) {
    return (
      <div className="container-brand py-20 text-center max-w-lg mx-auto">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Your order number is:</p>
        <p className="text-2xl font-bold text-brand-maroon mb-6">{orderNumber}</p>
        <p className="text-gray-600 mb-8">
          {paymentMethod === 'COD'
            ? 'Your Cash on Delivery order has been placed. Our team will contact you soon.'
            : 'We have received your order and are processing it.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => router.push('/account/orders')} className="btn-primary">
            Track Order
          </button>
          <button onClick={() => router.push('/shop')} className="btn-outline">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step !== 'review') {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container-brand py-10">
      <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10">
        {(['shipping', 'payment', 'review'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s ? 'bg-brand-maroon text-white' :
              ['shipping', 'payment', 'review'].indexOf(step) > i ? 'bg-green-500 text-white' :
              'bg-gray-200 text-gray-500'
            }`}>
              {i + 1}
            </div>
            <span className={`text-sm font-medium capitalize ${step === s ? 'text-brand-maroon' : 'text-gray-500'}`}>
              {s === 'review' ? 'Confirm' : s}
            </span>
            {i < 2 && <div className="w-12 h-px bg-gray-300 ml-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {/* Shipping Step */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <h2 className="font-serif text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon"
                    placeholder="e.g., Ayesha Khan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon"
                    placeholder="e.g., 03001234567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={shippingForm.street}
                  onChange={(e) => setShippingForm({ ...shippingForm, street: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon"
                  placeholder="House/Flat No., Street, Area"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                  <select
                    required
                    value={shippingForm.province}
                    onChange={(e) => setShippingForm({ ...shippingForm, province: e.target.value, city: '' })}
                    className="w-full border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon"
                  >
                    {PAKISTAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <select
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={shippingForm.postalCode}
                    onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon"
                    placeholder="e.g., 54000"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary px-12 py-4 w-full md:w-auto">
                Continue to Payment
              </button>
            </form>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div>
              <h2 className="font-serif text-xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                {([
                  { id: 'COD', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: '💵' },
                  { id: 'JAZZCASH', label: 'JazzCash', desc: 'Pay via JazzCash mobile account', icon: '📱' },
                  { id: 'EASYPAISA', label: 'Easypaisa', desc: 'Pay via Easypaisa account', icon: '📲' },
                  { id: 'STRIPE', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, etc.', icon: '💳' },
                ] as { id: PaymentMethod; label: string; desc: string; icon: string }[]).map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-brand-maroon bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-brand-charcoal">{method.label}</p>
                      <p className="text-sm text-gray-500">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? 'border-brand-maroon' : 'border-gray-300'
                    }`}>
                      {paymentMethod === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-maroon" />
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Discount code */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="e.g., WELCOME10"
                    className="flex-1 border border-gray-300 px-3 py-3 focus:outline-none focus:border-brand-maroon uppercase"
                  />
                  <button type="button" className="btn-outline px-6">Apply</button>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep('shipping')} className="btn-outline px-8 py-4">
                  Back
                </button>
                <button onClick={() => setStep('review')} className="btn-primary px-12 py-4">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {step === 'review' && !orderNumber && (
            <div>
              <h2 className="font-serif text-xl font-bold mb-6">Review & Confirm</h2>

              <div className="bg-gray-50 p-4 mb-6 rounded">
                <h3 className="font-medium mb-2">Shipping To:</h3>
                <p className="text-sm text-gray-600">
                  {shippingForm.fullName} — {shippingForm.phone}<br />
                  {shippingForm.street}, {shippingForm.city}, {shippingForm.province} {shippingForm.postalCode}
                </p>
              </div>

              <div className="bg-gray-50 p-4 mb-6 rounded">
                <h3 className="font-medium mb-2">Payment:</h3>
                <p className="text-sm text-gray-600">
                  {paymentMethod === 'COD' ? '💵 Cash on Delivery' :
                   paymentMethod === 'JAZZCASH' ? '📱 JazzCash' :
                   paymentMethod === 'EASYPAISA' ? '📲 Easypaisa' : '💳 Card'}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} ({item.size}/{item.color}) × {item.quantity}
                    </span>
                    <span className="font-medium">Rs. {(item.price * item.quantity).toLocaleString('en-PK')}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep('payment')} className="btn-outline px-8 py-4">
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary px-12 py-4 flex-1 disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-white border border-gray-100 p-6 sticky top-24">
            <h3 className="font-serif text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.variantId} className="flex justify-between">
                  <span className="text-gray-600 flex-1 pr-2">{item.name} × {item.quantity}</span>
                  <span className="font-medium">Rs. {(item.price * item.quantity).toLocaleString('en-PK')}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rs. {sub.toLocaleString('en-PK')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `Rs. ${shipping}`}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-brand-maroon">Rs. {total.toLocaleString('en-PK')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
