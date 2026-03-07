'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GENDER_OPTIONS, SIZES_WOMEN, SIZES_MEN } from '@/lib/constants';

const CATEGORIES = [
  { slug: 'shalwar-kameez', name: 'Shalwar Kameez' },
  { slug: 'kurta', name: 'Kurta' },
  { slug: 'lehenga', name: 'Lehenga' },
  { slug: 'dupatta', name: 'Dupatta & Scarves' },
  { slug: 'kids-wear', name: 'Kids Wear' },
];

const PRICE_RANGES = [
  { label: 'Under PKR 3,000', min: 0, max: 3000 },
  { label: 'PKR 3,000 – 6,000', min: 3000, max: 6000 },
  { label: 'PKR 6,000 – 12,000', min: 6000, max: 12000 },
  { label: 'PKR 12,000 – 30,000', min: 12000, max: 30000 },
  { label: 'Above PKR 30,000', min: 30000, max: 999999 },
];

const ALL_SIZES = [...new Set([...SIZES_WOMEN, ...SIZES_MEN])];

const COLORS = [
  'Crimson', 'Ivory', 'Midnight Indigo', 'Mauve', 'Sage Green',
  'Cobalt Blue', 'Terracotta', 'Burgundy', 'Gold', 'Forest Green',
];

interface FilterSidebarProps {
  className?: string;
  onClose?: () => void;
}

export default function FilterSidebar({ className, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = (key: string) => searchParams.get(key) ?? '';
  const getArrayParam = (key: string): string[] => {
    const val = searchParams.get(key);
    return val ? val.split(',') : [];
  };

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const current = getArrayParam(key);
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParam(key, updated.length ? updated.join(',') : null);
    },
    [getArrayParam, updateParam],
  );

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasFilters = searchParams.toString().length > 0;
  const selectedSizes = getArrayParam('sizes');
  const selectedColors = getArrayParam('colors');
  const selectedCategory = getParam('category');
  const selectedGender = getParam('gender');
  const selectedPriceRange = getParam('priceRange');

  return (
    <aside className={cn('space-y-6', className)} aria-label="Product filters">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-charcoal">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </h2>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-brand-maroon hover:underline"
            >
              Clear All
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="btn-icon lg:hidden"
              aria-label="Close filters"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Category
        </h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() =>
                  updateParam(
                    'category',
                    selectedCategory === cat.slug ? null : cat.slug,
                  )
                }
                className={cn(
                  'w-full text-left text-sm transition-colors hover:text-brand-maroon',
                  selectedCategory === cat.slug
                    ? 'font-semibold text-brand-maroon'
                    : 'text-brand-charcoal',
                )}
                aria-pressed={selectedCategory === cat.slug}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Gender */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          For
        </h3>
        <div className="flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((gender) => (
            <button
              key={gender}
              onClick={() =>
                updateParam('gender', selectedGender === gender ? null : gender)
              }
              className={cn(
                'rounded-none border px-3 py-1.5 text-xs font-medium transition-colors',
                selectedGender === gender
                  ? 'border-brand-maroon bg-brand-maroon text-white'
                  : 'border-gray-200 text-gray-600 hover:border-brand-maroon hover:text-brand-maroon',
              )}
              aria-pressed={selectedGender === gender}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Price Range
        </h3>
        <ul className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const rangeKey = `${range.min}-${range.max}`;
            return (
              <li key={rangeKey}>
                <button
                  onClick={() =>
                    updateParam(
                      'priceRange',
                      selectedPriceRange === rangeKey ? null : rangeKey,
                    )
                  }
                  className={cn(
                    'w-full text-left text-sm transition-colors hover:text-brand-maroon',
                    selectedPriceRange === rangeKey
                      ? 'font-semibold text-brand-maroon'
                      : 'text-brand-charcoal',
                  )}
                  aria-pressed={selectedPriceRange === rangeKey}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sizes */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayParam('sizes', size)}
              className={cn(
                'flex h-8 min-w-[2rem] items-center justify-center rounded-none border px-2 text-xs font-medium transition-colors',
                selectedSizes.includes(size)
                  ? 'border-brand-maroon bg-brand-maroon text-white'
                  : 'border-gray-200 text-gray-600 hover:border-brand-maroon hover:text-brand-maroon',
              )}
              aria-pressed={selectedSizes.includes(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Color
        </h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => toggleArrayParam('colors', color)}
              className={cn(
                'rounded-none border px-2.5 py-1 text-xs transition-colors',
                selectedColors.includes(color)
                  ? 'border-brand-maroon bg-brand-maroon text-white'
                  : 'border-gray-200 text-gray-600 hover:border-brand-maroon',
              )}
              aria-pressed={selectedColors.includes(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
