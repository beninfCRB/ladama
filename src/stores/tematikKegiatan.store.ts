import { createGlobalStore } from "@/lib/globalStore";

export interface TematikKegiatanType {
  id: string;
  tematik_kegiatan: string;
  deskripsi_tematik: string;
  image: string | null;
}

export const useTematikKegiatan = createGlobalStore<
  Array<TematikKegiatanType>,
  "tematikKegiatan"
>("tematikKegiatan", ["read"]);
