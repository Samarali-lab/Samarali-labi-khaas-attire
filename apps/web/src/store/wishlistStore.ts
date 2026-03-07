import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, WishlistItem } from '@/types';
import toast from 'react-hot-toast';

interface WishlistStore {
  items: WishlistItem[];

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const exists = items.some((item) => item.productId === product.id);
        if (!exists) {
          set({
            items: [
              ...items,
              {
                productId: product.id,
                product,
                addedAt: new Date().toISOString(),
              },
            ],
          });
          toast.success('Added to wishlist', { icon: '❤️', duration: 2000 });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
        toast.success('Removed from wishlist', { icon: '💔', duration: 2000 });
      },

      toggleItem: (product) => {
        const { items } = get();
        const exists = items.some((item) => item.productId === product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) =>
        get().items.some((item) => item.productId === productId),

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => get().items.length,
    }),
    {
      name: 'khaas-attire-wishlist',
      version: 1,
    },
  ),
);
