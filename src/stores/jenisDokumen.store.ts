import { createGlobalStore } from "@/lib/globalStore";

export interface jenisDokumenType {
  id: string;
  tahapan_pengajuan_kegiatan: string;
  jenis_dokumen: string;
  dokumen_url: string;
  dokumen: {
    id: string;
    group: string;
    visibility: string;
    file_name: string;
    file_path: string;
    fileable_id: string;
    real_name: string;
  };
}

export const useJenisDokumen = createGlobalStore<
  Array<jenisDokumenType>,
  "getJenisDokumen"
>("getJenisDokumen", ["read"]);
