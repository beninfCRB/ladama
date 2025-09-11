import type { UserType } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: UserType | null;
  setUser: (data: UserType | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (data) => set({ user: data }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "user_data",
    }
  )
);

interface TokenStore {
  token: string | null;
  setToken: (data: string | null) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,

      setToken: (data) => set({ token: data }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "token",
    }
  )
);
