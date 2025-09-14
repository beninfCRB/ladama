import { createGlobalStore } from "@/lib/globalStore";
import { create } from "zustand";

export interface subtematikKegiatanType {
  id: string;
  tematik_kegiatan_id: string;
  sub_tematik_kegiatan: string;
  image: string | null;
}

export const useSubtematikKegiatan = createGlobalStore<
  { tematik_kegiatan_id: string } | subtematikKegiatanType[],
  "subTematikKegiatan"
>("subTematikKegiatan", ["create"]);

interface SubtematikKegiatanStore {
  data: subtematikKegiatanType[] | null;
  setData: (data: subtematikKegiatanType[]) => void;
}

export const useSubtematikKegiatanStore = create<SubtematikKegiatanStore>(
  (set) => {
    return {
      data: null,
      setData: (data: subtematikKegiatanType[]) => set({ data }),
    };
  }
);
