'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, CreditCard, CheckCircle, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPKR } from '@/lib/utils';
import { PAKISTAN_PROVINCES, PAKISTAN_CITIES, PAYMENT_METHODS, SHIPPING } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required').or(z.literal('')),
  phone: z.string().min(11, 'Valid phone number required'),
  address: z.string().min(10, 'Please enter a detailed address'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(['COD', 'JAZZCASH', 'EASYPAISA', 'STRIPE']),
  notes: z.string().optional(),
  discountCode: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const STEPS = ['Shipping', 'Payment', 'Confirm'];

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  const subtotal = getSubtotal();
  const shippingFee = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardFee;
  const total = subtotal + shippingFee;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'COD',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    const num = `KA-${Date.now().toString().slice(-8)}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container-brand py-20 text-center">
        <h1 className="heading-md mb-4">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-brand-ivory min-h-screen">
        <div className="container-brand max-w-2xl py-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="heading-md mb-3">Order Confirmed! 🎉</h1>
          <p className="mb-2 text-gray-600">
            Thank you for shopping with Khaas Attire.
          </p>
          <p className="mb-8 font-medium text-brand-maroon">
            Order #{orderNumber}
          </p>
          <p className="mb-8 text-sm text-gray-500">
            You will receive a confirmation SMS/WhatsApp shortly. Expected delivery in 3–5 business days.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/account" className="btn-secondary">Track Order</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen">
      <div className="container-brand py-8">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/cart" className="breadcrumb-item">Cart</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="text-brand-charcoal">Checkout</span>
        </nav>

        <h1 className="heading-lg mb-8">Checkout</h1>

        {/* Progress steps */}
        <div className="mb-8 flex items-center gap-0">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  i <= currentStep
                    ? 'bg-brand-maroon text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 hidden text-sm font-medium sm:block ${
                  i <= currentStep ? 'text-brand-maroon' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-3 h-px w-12 sm:w-20 ${
                    i < currentStep ? 'bg-brand-maroon' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Shipping info */}
              <div className="bg-white p-6">
                <h2 className="mb-5 flex items-center gap-2 font-playfair text-lg font-semibold">
                  <MapPin className="h-5 w-5 text-brand-gold" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    required
                    placeholder="e.g. Sara Khan"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Phone Number"
                    required
                    type="tel"
                    placeholder="+92 300 1234567"
                    {...register('phone')}
                    error={errors.phone?.message}
                    hint="WhatsApp number preferred for order updates"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="sara@example.com"
                      {...register('email')}
                      error={errors.email?.message}
                      hint="Optional — for order confirmation email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      label="Street Address"
                      required
                      placeholder="House #, Street, Area, Sector"
                      {...register('address')}
                      error={errors.address?.message}
                    />
                  </div>

                  {/* Province */}
                  <div>
                    <label className="label-brand" htmlFor="province">
                      Province <span className="text-brand-maroon">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="province"
                        className="input-brand w-full appearance-none pr-8"
                        {...register('province')}
                        onChange={(e) => {
                          setSelectedProvince(e.target.value);
                          setValue('province', e.target.value);
                          setValue('city', '');
                        }}
                      >
                        <option value="">Select Province</option>
                        {PAKISTAN_PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.province && (
                      <p className="mt-1 text-xs text-red-500">{errors.province.message}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="label-brand" htmlFor="city">
                      City <span className="text-brand-maroon">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="city"
                        className="input-brand w-full appearance-none pr-8"
                        {...register('city')}
                      >
                        <option value="">Select City</option>
                        {(selectedProvince ? PAKISTAN_CITIES[selectedProvince] ?? [] : []).map(
                          (city) => (
                            <option key={city} value={city}>{city}</option>
                          ),
                        )}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                    )}
                  </div>

                  <Input
                    label="Postal Code"
                    placeholder="e.g. 44000"
                    {...register('postalCode')}
                    error={errors.postalCode?.message}
                  />
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white p-6">
                <h2 className="mb-5 flex items-center gap-2 font-playfair text-lg font-semibold">
                  <CreditCard className="h-5 w-5 text-brand-gold" />
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-start gap-3 border-2 p-4 transition-colors ${
                        selectedPaymentMethod === method.id
                          ? 'border-brand-maroon bg-brand-ivory'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={method.id}
                        className="mt-0.5 accent-brand-maroon"
                        {...register('paymentMethod')}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{method.icon}</span>
                          <span className="text-sm font-semibold text-brand-charcoal">
                            {method.label}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order notes */}
              <div className="bg-white p-6">
                <h2 className="mb-3 font-playfair text-lg font-semibold">Order Notes</h2>
                <textarea
                  className="input-brand w-full resize-none"
                  rows={3}
                  placeholder="Special instructions, gift messages, delivery preferences..."
                  {...register('notes')}
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white p-6">
                <h2 className="heading-sm mb-5">Order Summary</h2>

                {/* Items */}
                <ul className="mb-5 max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                      <div className="h-16 w-14 flex-shrink-0 bg-brand-ivory-dark" />
                      <div className="flex-1 min-w-0">
                        <p className="line-clamp-1 text-xs font-medium text-brand-charcoal">
                          {item.product.name}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-gray-400">
                            {item.variant.size} · {item.variant.color}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-brand-maroon">
                          {formatPKR(item.product.price)} × {item.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Discount code */}
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="input-brand flex-1 !py-2 text-xs"
                    {...register('discountCode')}
                  />
                  <button type="button" className="btn-secondary !px-3 !py-2 !text-xs">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-playfair text-xl font-bold text-brand-maroon">
                      {formatPKR(total)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  className="mt-5"
                >
                  Place Order
                </Button>

                <p className="mt-3 text-center text-xs text-gray-400">
                  By placing your order, you agree to our{' '}
                  <Link href="/terms" className="text-brand-maroon hover:underline">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-brand-maroon hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
