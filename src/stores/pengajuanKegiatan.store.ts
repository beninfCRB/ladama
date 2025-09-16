import { createGlobalStore } from "@/lib/globalStore";

interface SubPengajuanKegiatanTypes {
  tematik_kegiatan: "FOLU GOES TO SCHOOL";
  sub_tematik_tematik_kegiatan: "Energi Baru dan Terbarukan";
  jenis_kegiatan: "Sosialisasi";
  paket_kegiatan: "Folu Goes To School Energi Baru dan Terbarukan Sosialisasi 50 org";
  judul_pengajuan_kegiatan: "sdfgfdsgfsdg";
  provinsi_kegiatan: "BANTEN";
  kabupaten_kegiatan: "KABUPATEN TANGERANG";
  kecamatan_kegiatan: "LEGOK";
  kelurahan_kegiatan: "BOJONG KAMAL";
  alamat_kegiatan: "sdfgfsdgsdfgsfdgsdfgfsdgsdfg";
  proposal_kegiatan: "sdfgsdfgsdfgsdfgdfgfdshfgdhjsdfhsdfhfghfdgjdfghfadgfdgsdfgdfgdfgdfgdfgfd";
  tujuan_kegiatan: "dsfgjdfhfdshghjkdhfhfdgjfghkffhgsdfhfgjdghsfdhfh";
  ruang_lingkup_kegiatan: "sdfhfkfghfjghjfghjfgfdhrgjghjfghjgfhjgjgdjsh";
  tanggal_kegiatan: "2025-10-15 - 2025-10-16";
}

interface KomponenRabTypes {
  id_komponen: "df30c8b1-d569-402d-9486-34b5b5aa636a";
  jenis_komponen_rab: "Lain-lain";
  komponen_rab: "Lain-lain";
  satuan: "Paket";
  harga_unit: 5000000;
  nilai_standar: 5000000;
  qty: 1;
}

export interface PengajuanKegiatanTypes {
  id_pengajuan: "34d25553-b51e-4d5b-9619-90baf25d106b";
  nomor_pengajuan: "12121-2509-00115";
  caping_rab: "50000000";
  pengajuan_kegiatan: SubPengajuanKegiatanTypes;
  komponen_rab: {
    "Lain-lain": Array<KomponenRabTypes>;
    "Jasa Profesi": Array<KomponenRabTypes>;
    Transportasi: Array<KomponenRabTypes>;
    Perlengkapan: Array<KomponenRabTypes>;
    Konsumsi: Array<KomponenRabTypes>;
    "Sewa Ruangan": Array<KomponenRabTypes>;
  };
}

export const usePengajuanKegiatan = createGlobalStore<
  PengajuanKegiatanTypes,
  "pengajuanKegiatan",
  FormData
>("pengajuanKegiatan", ["create"]);
