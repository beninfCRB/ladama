import { createGlobalStore } from "@/lib/globalStore";

export interface RiwayatPengajuanType {
  id: string;
  nomor_pengajuan: string;
  tematik_kegiatan: string;
  sub_tematik_kegiatan: string;
  jenis_kegiatan: string;
  jumlah: string;
  lokasi: string;
  tahapan_pengajuan: string;
  persentase_pengajuan: number | null;
  dana_yang_disetujui: number;
  dana_yang_diajukan: number;
  dana_yang_dicairkan: number;
  sisa_pencairan: number;
  tanggal_kegiatan: string;
}

export const useRiwayatPengajuan = createGlobalStore<
  Array<RiwayatPengajuanType>,
  "getDataRiwayatPengajuan"
>("getDataRiwayatPengajuan", ["read"]);
