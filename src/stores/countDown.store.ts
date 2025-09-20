import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DeadlineState {
  isBeforeDeadline: boolean;
  setIsBeforeDeadline: (value: boolean) => void;
}

export const useDeadlineStore = create<DeadlineState>()(
  persist(
    (set) => ({
      isBeforeDeadline: false,
      setIsBeforeDeadline: (value) => set({ isBeforeDeadline: value }),
    }),
    {
      name: "deadline-storage",
    }
  )
);
