import { createGlobalStore } from "@/lib/globalStore";

export interface subtematikKegiatanType {
  id: string;
  tematik_kegiatan_id: string;
  sub_tematik_kegiatan: string;
  image: string | null;
}

export const useSubtematikKegiatan = createGlobalStore<
  Array<subtematikKegiatanType>,
  "subTematikKegiatan",
  {
    tematik_kegiatan_id: string;
  }
>("subTematikKegiatan", ["create"]);
