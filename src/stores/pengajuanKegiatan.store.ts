import { createGlobalStore } from "@/lib/globalStore";

interface SubPengajuanKegiatanTypes {
  tematik_kegiatan: string;
  sub_tematik_tematik_kegiatan: string;
  jenis_kegiatan: string;
  paket_kegiatan: string;
  judul_pengajuan_kegiatan: string;
  provinsi_kegiatan: string;
  kabupaten_kegiatan: string;
  kecamatan_kegiatan: string;
  kelurahan_kegiatan: string;
  alamat_kegiatan: string;
  proposal_kegiatan: string;
  tujuan_kegiatan: string;
  ruang_lingkup_kegiatan: string;
  tanggal_kegiatan: string;
}

interface KomponenRabTypes {
  id_komponen: string;
  jenis_komponen_rab: string;
  komponen_rab: string;
  satuan: string;
  harga_unit: number;
  nilai_standar: number;
  qty: number;
}

export interface KomponenRabArrayTypes {
  komponen_rab: {
    "Lain-lain": Array<KomponenRabTypes>;
    "Jasa Profesi": Array<KomponenRabTypes>;
    Transportasi: Array<KomponenRabTypes>;
    Perlengkapan: Array<KomponenRabTypes>;
    Konsumsi: Array<KomponenRabTypes>;
    "Sewa Ruangan": Array<KomponenRabTypes>;
  };
}

export interface PengajuanKegiatanTypes extends KomponenRabArrayTypes {
  id_pengajuan: string;
  nomor_pengajuan: string;
  caping_rab: string;
  pengajuan_kegiatan: SubPengajuanKegiatanTypes;
}

export const usePengajuanKegiatan = createGlobalStore<
  PengajuanKegiatanTypes,
  "pengajuanKegiatan",
  FormData
>("pengajuanKegiatan", ["create"]);

export function useRabPengajuanKegiatan(id: string) {
  return createGlobalStore<
    PengajuanKegiatanTypes,
    "pengajuanKegiatan",
    FormData
  >("pengajuanKegiatan", ["update"])({ id });
}
