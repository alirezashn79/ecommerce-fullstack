import axios from "axios";
import { IFProduct } from "types/auth";
import { create } from "zustand";

interface IWishes {
  wishes: IFProduct[] | null;
  addToWishes: ({
    user,
    product,
  }: {
    user: string;
    product: string;
  }) => Promise<void>;
}

export const useWishlist = create<IWishes>((set) => ({
  wishes: null,
  addToWishes: async ({ user, product }) => {
    const res = await axios.post("/api/wishlist", { user, product });
    console.log(res);
  },
}));
