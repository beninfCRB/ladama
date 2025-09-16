import { createGlobalStore } from "@/lib/globalStore";

export interface RangeOpeningType {
  tanggal_awal: string;
  jam_awal: string;
  tanggal_akhir: string;
  jam_akhir: string;
  batas_pengajuan: number;
}

export const useRangeOpening = createGlobalStore<
  RangeOpeningType,
  "getRangeOpening"
>("getRangeOpening", ["read"]);
