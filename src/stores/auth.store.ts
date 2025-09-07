import { handleLogin } from "@/handlers/auth/login.handler";
import { createGlobalStore } from "@/lib/globalStore";
import type { UserType } from "@/types/user";

interface LoginTypes extends UserType {
  email: string;
  password: string;
}

export const useLogin = createGlobalStore<LoginTypes>("login", handleLogin, [
  "create",
]);

interface RegisterFormType {
  jenis_kelompok_masyarakat_id?: string;
  kelompok_masyarakat?: string;
  profil_kelompok?: FileList;
  foto_ktp?: FileList;
  nama_pic?: string;
  nomor_identitas_pic?: string;
  nomor_npwp_pic?: string;
  alamat_pic?: string;
  provinsi_pic?: string;
  kecamatan_pic?: string;
  kelurahan_pic?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  agama_id?: string;
  status_perkawinan_id?: string;
  nama_gadis_ibu_kandung?: string;
  jenis_pekerjaan_id?: string;
  nohp_pic?: string;
  email_pic?: string;
  kode_aktivasi?: string;
  provinsi_kelompok_masyarakat_id?: string;
  kabupaten_kelompok_masyarakat_id?: string;
  kecamatan_kelompok_masyarakat_id?: string;
  kelurahan_kelompok_masyarakat_id?: string;
  pendidikan?: string;
  jenis_kelamin?: string;
  nama_kontak_darurat?: string;
  nomor_kontak_darurat?: string;
}

export const useRegister = createGlobalStore<RegisterFormType>(
  "registerdua",
  function () {},
  ["create"]
);
