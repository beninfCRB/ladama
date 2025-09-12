import { create } from "zustand";

export interface ModalStore {
  modals: Record<string, boolean>;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
  toggleModal: (name: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},

  openModal: (name: string) =>
    set((state) => ({
      modals: { ...state.modals, [name]: true },
    })),

  closeModal: (name: string) =>
    set((state) => ({
      modals: { ...state.modals, [name]: false },
    })),

  toggleModal: (name: string) =>
    set((state) => ({
      modals: { ...state.modals, [name]: !state.modals[name] },
    })),
}));
