import axios from "axios";
import { create } from "zustand";

interface IUser {
  user: { _id: string } | null;
  getUser: () => Promise<void>;
}

export const useAuth = create<IUser>((set) => ({
  user: null,
  getUser: async () => {
    const res = await axios.get("/api/auth/me");
    set({ user: res.data });
  },
}));
