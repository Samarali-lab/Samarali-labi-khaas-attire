'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Share2, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
  sku: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  images: string[];
  variants: Variant[];
  fabric?: string;
  careInstructions?: string;
  category: { name: string; slug: string };
  sku: string;
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] || null,
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'fabric' | 'care'>('description');
  const addItem = useCartStore((state) => state.addItem);

  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const compareAtPrice = product.compareAtPrice
    ? typeof product.compareAtPrice === 'string'
      ? parseFloat(product.compareAtPrice)
      : product.compareAtPrice
    : null;
  const isOnSale = compareAtPrice && compareAtPrice > price;

  const sizes = [...new Set(product.variants?.map((v) => v.size) || [])];
  const colors = [...new Set(product.variants?.map((v) => v.color) || [])];

  const getVariant = (size: string, color: string) =>
    product.variants?.find((v) => v.size === size && v.color === color);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      id: selectedVariant.id,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price,
      image: product.images[0] || '',
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    });
  };

  return (
    <div className="container-brand py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-maroon">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-brand-maroon">Shop</Link>
        <ChevronRight size={14} />
        <Link href={`/shop?category=${product.category?.slug}`} className="hover:text-brand-maroon">
          {product.category?.name}
        </Link>
        <ChevronRight size={14} />
        <span className="text-brand-charcoal font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
            {product.images?.[selectedImage] && (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 aspect-[3/4] border-2 overflow-hidden ${
                    selectedImage === i ? 'border-brand-maroon' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
          <h1 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-brand-maroon">
              Rs. {price.toLocaleString('en-PK')}
            </span>
            {isOnSale && (
              <span className="text-xl text-gray-400 line-through">
                Rs. {compareAtPrice.toLocaleString('en-PK')}
              </span>
            )}
            {isOnSale && (
              <span className="bg-brand-maroon text-white text-sm px-2 py-1">
                {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Color selector */}
          {colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Color: <span className="text-brand-charcoal">{selectedVariant?.color}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      const v = getVariant(selectedVariant?.size || sizes[0], color);
                      if (v) setSelectedVariant(v);
                    }}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedVariant?.color === color
                        ? 'border-brand-maroon bg-brand-maroon text-white'
                        : 'border-gray-300 hover:border-brand-maroon'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">
                  Size: <span className="text-brand-charcoal">{selectedVariant?.size}</span>
                </p>
                <Link href="/size-guide" className="text-sm text-brand-maroon hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const v = getVariant(size, selectedVariant?.color || colors[0]);
                  const outOfStock = !v || v.stock === 0;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        if (!outOfStock && v) setSelectedVariant(v);
                      }}
                      disabled={outOfStock}
                      className={`w-12 h-12 text-sm border font-medium transition-colors ${
                        selectedVariant?.size === size
                          ? 'border-brand-maroon bg-brand-maroon text-white'
                          : outOfStock
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : 'border-gray-300 hover:border-brand-maroon'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))}
                  className="p-3 hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
              {selectedVariant && (
                <p className="text-sm text-gray-500">
                  {selectedVariant.stock} available
                </p>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className="flex-1 btn-primary flex items-center justify-center gap-2 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button className="border border-gray-300 p-4 hover:border-brand-maroon hover:text-brand-maroon transition-colors">
              <Heart size={18} />
            </button>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
            <Share2 size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">Share:</span>
            <a
              href={`https://wa.me/?text=Check out ${product.name} on KHAAS ATTIRE: ${typeof window !== 'undefined' ? window.location.href : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 text-sm hover:underline"
            >
              WhatsApp
            </a>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {(['description', 'fabric', 'care'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-brand-maroon text-brand-maroon'
                      : 'border-transparent text-gray-500 hover:text-brand-charcoal'
                  }`}
                >
                  {tab === 'care' ? 'Care Instructions' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'fabric' && (
                <p>{product.fabric || 'Premium quality fabric. See product description for details.'}</p>
              )}
              {activeTab === 'care' && (
                <p>{product.careInstructions || 'Hand wash or gentle machine wash. Do not bleach.'}</p>
              )}
            </div>
          </div>

          {/* Info badges */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: '🚚', label: 'Free Delivery', sub: 'Orders over Rs. 5,000' },
              { icon: '💵', label: 'Cash on Delivery', sub: 'Available nationwide' },
              { icon: '↩️', label: 'Easy Returns', sub: '7-day return policy' },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 bg-gray-50">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs font-medium text-brand-charcoal">{item.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
