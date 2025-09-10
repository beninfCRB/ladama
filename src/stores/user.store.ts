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
