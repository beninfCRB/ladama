import { createGlobalStore } from "@/lib/globalStore";

export interface JenisKelompokStoreTypes {
  id?: string;
  jenis_kelompok_masyarakat?: string;
  short_id?: number;
  flag?: number;
}

export const useJenisKelompok = createGlobalStore<
  Array<JenisKelompokStoreTypes>
>("jenisKelompokMasyarakat", undefined, ["read"]);
