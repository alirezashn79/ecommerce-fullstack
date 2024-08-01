import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IProduct {
  id: string;
  name: string;
  price: number;
  count: number;
}

interface ICart {
  products: IProduct[] | [];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
}

const useCartStore = create<ICart>()(
  persist(
    (set, get) => ({
      products: [],

      addToCart: (product) => {
        const result = get().products.slice();
        const index = result.findIndex((item) => item.id === product.id);
        if (~index) {
          result[index] = product;
        } else {
          result.push(product);
        }
        set({ products: result });
      },
      removeFromCart: (id) => {
        const clone = get().products?.slice();
        const filteredClone = clone.filter((item) => item.id !== id);
        set({ products: filteredClone });
      },
    }),
    {
      name: "cart",
      // partialize: (state) => ({ products: state.products || [] }),
      version: undefined,
    }
  )
);

export default useCartStore;
