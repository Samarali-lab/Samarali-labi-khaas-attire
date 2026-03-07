import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant, CartStoreItem } from '@/types';
import { formatPKR } from '@/lib/utils';
import toast from 'react-hot-toast';

interface CartStore {
  items: CartStoreItem[];
  isOpen: boolean;

  // Actions
  addItem: (
    product: Product,
    variant: ProductVariant | null,
    quantity?: number,
  ) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed values
  getTotalItems: () => number;
  getSubtotal: () => number;
  getItemCount: (productId: string, variantId: string | null) => number;
}

function getItemKey(productId: string, variantId: string | null): string {
  return `${productId}:${variantId ?? 'no-variant'}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) =>
            item.productId === product.id &&
            item.variantId === (variant?.id ?? null),
        );

        if (existingIndex !== -1) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product.id,
                variantId: variant?.id ?? null,
                product,
                variant,
                quantity,
              },
            ],
            isOpen: true,
          });
        }
        toast.success(`${product.name} added to cart`, {
          icon: '🛍️',
          duration: 2000,
        });
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.variantId === variantId
              ),
          ),
        });
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        ),

      getItemCount: (productId, variantId) => {
        const item = get().items.find(
          (i) => i.productId === productId && i.variantId === variantId,
        );
        return item?.quantity ?? 0;
      },
    }),
    {
      name: 'khaas-attire-cart',
      version: 1,
    },
  ),
);

// Suppress unused variable warning
void getItemKey;
