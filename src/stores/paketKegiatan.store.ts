import { createGlobalStore } from "@/lib/globalStore";

export interface SubPaketKegiatanTypes {
  jenis_kegiatan_id: string;
  id: string;
  jumlah_peserta: number;
}

export interface PaketKegaiatanTypes {
  id: string;
  jenis_kegiatan: string;
  paket_kegiatan: Array<SubPaketKegiatanTypes>;
}

export function usePaketKegiatan(tematikId: string, subtematikId?: string) {
  return createGlobalStore<Array<PaketKegaiatanTypes>, "paketKegiatan">(
    `paketKegiatan`,
    tematikId && subtematikId ? ["read"] : []
  )({
    id: `${tematikId}/${subtematikId}`,
  });
}
