import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PwaState {
  deferredPrompt: BeforeInstallPromptEvent | null;
  installPromptShown: boolean;
  setDeferredPrompt: (e: BeforeInstallPromptEvent | null) => void;
  setInstallPromptShown: (shown: boolean) => void;
}

export const usePwaStore = create<PwaState>()(
  persist(
    (set) => ({
      deferredPrompt: null,
      installPromptShown: false,
      setDeferredPrompt: (e) => set({ deferredPrompt: e }),
      setInstallPromptShown: (shown) => set({ installPromptShown: shown }),
    }),
    {
      name: "pwa-storage",
      partialize: (state) => ({ installPromptShown: state.installPromptShown }),
    }
  )
);
