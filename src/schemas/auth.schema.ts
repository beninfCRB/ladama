import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email_pic: z
    .string()
    .email("Email harus berupa alamat email yang valid.")
    .min(1, "Email tidak boleh kosong."),
  password: z.string().min(1, "Password tidak boleh kosong."),
});

const registerSchema = z.object({
  jenis_kelompok_masyarakat_id: z.string(),
  kelompok_masyarakat: z.string(),
  profil_kelompok: z.file(),
  foto_ktp: z.file(),
  nama_pic: z.string(),
  nomor_identitas_pic: z.string(),
  nomor_npwp_pic: z.string(),
  alamat_pic: z.string(),
  provinsi_pic: z.string(),
  kecamatan_pic: z.string(),
  kelurahan_pic: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.string(),
  agama_id: z.string(),
  status_perkawinan_id: z.string(),
  nama_gadis_ibu_kandung: z.string(),
  jenis_pekerjaan_id: z.string(),
  nohp_pic: z.string(),
  email_pic: z.string(),
  kode_aktivasi: z.string(),
  provinsi_kelompok_masyarakat_id: z.string(),
  kabupaten_kelompok_masyarakat_id: z.string(),
  kecamatan_kelompok_masyarakat_id: z.string(),
  kelurahan_kelompok_masyarakat_id: z.string(),
  pendidikan: z.string(),
  jenis_kelamin: z.string(),
  nama_kontak_darurat: z.string(),
  nomor_kontak_darurat: z.string(),
});

type registerFormType = UseFormReturn<z.infer<typeof registerSchema>>;

export { loginSchema, registerSchema, type registerFormType };
