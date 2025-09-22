import { createGlobalStore } from "@/lib/globalStore";

interface LampiranLogkegiatanTypes {
  id: string;
  group: string;
  visibility: string;
  file_name: string;
  file_path: string;
  fileable_id: string;
  size: number;
}

interface DetailLogKegiatanTypes {
  kelompok_masyarakat: string;
  tematik_kegiatan: string;
  sub_tematik_kegiatan: string;
  judul_pengajuan_kegiatan: string;
  kegiatan: string;
  jenis_kegiatan: string;
  rencana_kegiatan: string;
  jumlah: string;
  tanggal_pengajuan: string;
  tanggal_akhir_validasi: string;
  nama_pic: string;
  email_pic: string;
  lokasi: string;
  nomor_pengajuan: string;
  proposal_kegiatan: string;
  tujuan_kegiatan: string;
  ruang_lingkup_kegiatan: string;
  dana_yang_disetujui: number;
  dana_yang_dicairkan: number;
  sisa_pencairan: number;
  nama_verifikator: string | null;
  tanggal_verifikasi: string | null;
  catatan_verifikator: string | null;
  nama_validator: string | null;
  tanggal_validasi: string | null;
  catatan_validator: string | null;
  lampiran: LampiranLogkegiatanTypes;
  sk: string | null;
}

export interface LogKegiatanType {
  code_id: number;
  created_at: string;
  detail: DetailLogKegiatanTypes;
  id: string;
  sort: number;
  tahapan_kegiatan: string;
  tanggal_masuk: string | null;
  tanggal_selesai: string | null;
  updated_at: string;
  user_akseslh: string | null;
}

export const useLogKegiatan = (id?: string) => {
  return createGlobalStore<Array<LogKegiatanType>, "getLogKegiatan">(
    "getLogKegiatan",
    id ? ["read"] : []
  )({ id });
};
