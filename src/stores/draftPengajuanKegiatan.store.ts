import { createGlobalStore } from "@/lib/globalStore";
import type { PaketKegaiatanTypes } from "./paketKegiatan.store";

interface SubDraftFileDocumentTypes {
  id: string;
  group: string;
  visibility: string;
  file_name: string;
  file_path: string;
  fileable_id: string;
  size: number;
}

export interface DraftPengajuanKegiatanType {
  id: string;
  tematik_kegiatan_id: string;
  sub_tematik_kegiatan_id: string;
  judul_pengajuan_kegiatan: string;
  provinsi_kegiatan: number;
  kabupaten_kegiatan: number;
  kecamatan_kegiatan: number;
  kelurahan_kegiatan: number;
  alamat_kegiatan: string;
  jumlah_peserta: number;
  tanggal_kegiatan: string;
  waktu_kegiatan: string;
  proposal_kegiatan: string;
  tujuan_kegiatan: string;
  ruang_lingkup_kegiatan: string;
  paket_kegiatan: PaketKegaiatanTypes;
  jenis_kegiatan_id: string;
  fileDocument: Array<SubDraftFileDocumentTypes>;
  nomor_pengajuan: string;
  status: string;
  caping_rab: number;
}

export const useDraftPengajuanKegiatan = createGlobalStore<
  DraftPengajuanKegiatanType,
  "getDraftPengajuan"
>("getDraftPengajuan", ["read"]);
