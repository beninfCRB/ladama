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
  jenis_kelompok_masyarakat_id: z
    .string()
    .min(1, "Jenis Kelompok Masyarakat tidak boleh kosong."),
  kelompok_masyarakat: z
    .string()
    .min(1, "Kelompok Masyarakat tidak boleh kosong."),
  profil_kelompok: z
    .custom<FileList | null>((val) => val !== null && val instanceof FileList, {
      message: "File tidak boleh kosong",
    })
    .refine((file) => file !== null && file?.[0], "File tidak boleh kosong")
    .refine(
      (file) =>
        file !== null &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file[0].type),
      "Tipe file harus .doc, .docx, atau .pdf"
    )
    .refine(
      (file) => file !== null && file[0].size <= 10 * 1024 * 1024,
      "Ukuran file maksimal 10MB"
    ),
  foto_ktp: z
    .custom<FileList | null>((val) => val !== null && val instanceof FileList, {
      message: "File tidak boleh kosong",
    })
    .refine((file) => file !== null && file?.[0], "File tidak boleh kosong")
    .refine(
      (file) =>
        file !== null && ["image/jpg", "image/jpeg"].includes(file[0].type),
      "Tipe file harus .doc, .docx, atau .pdf"
    )
    .refine(
      (file) => file !== null && file[0].size <= 10 * 1024 * 1024,
      "Ukuran file maksimal 10MB"
    ),
  nama_pic: z.string().min(1, "Nama PIC tidak boleh kosong."),
  nomor_identitas_pic: z
    .string()
    .min(1, "Nomor Identitas PIC tidak boleh kosong."),
  nomor_npwp_pic: z.string().min(1, "Nomor NPWP PIC tidak boleh kosong."),
  alamat_pic: z.string().min(1, "Alamat PIC tidak boleh kosong."),
  provinsi_pic: z.string().min(1, "Provinsi PIC tidak boleh kosong."),
  kecamatan_pic: z.string().min(1, "Kecamatan PIC tidak boleh kosong."),
  kelurahan_pic: z.string().min(1, "Kelurahan PIC tidak boleh kosong."),
  tempat_lahir: z.string().min(1, "Tempat Lahir tidak boleh kosong."),
  tanggal_lahir: z.string().min(1, "Tanggal Lahir tidak boleh kosong."),
  agama_id: z.string().min(1, "Agama tidak boleh kosong."),
  status_perkawinan_id: z
    .string()
    .min(1, "Status Perkawinan tidak boleh kosong."),
  nama_gadis_ibu_kandung: z
    .string()
    .min(1, "Nama Gadis Ibu Kandung tidak boleh kosong."),
  jenis_pekerjaan_id: z.string().min(1, "Jenis Pekerjaan tidak boleh kosong."),
  nohp_pic: z.string().min(1, "Nomor HP PIC tidak boleh kosong."),
  email_pic: z.string().min(1, "Email PIC tidak boleh kosong."),
  kode_aktivasi: z.string().min(1, "Kode Aktivasi tidak boleh kosong."),
  provinsi_kelompok_masyarakat_id: z
    .string()
    .min(1, "Provinsi Kelompok Masyarakat tidak boleh kosong."),
  kabupaten_kelompok_masyarakat_id: z
    .string()
    .min(1, "Kabupaten Kelompok Masyarakat tidak boleh kosong."),
  kecamatan_kelompok_masyarakat_id: z
    .string()
    .min(1, "Kecamatan Kelompok Masyarakat tidak boleh kosong."),
  kelurahan_kelompok_masyarakat_id: z
    .string()
    .min(1, "Kelurahan Kelompok Masyarakat tidak boleh kosong."),
  pendidikan: z.string().min(1, "Pendidikan tidak boleh kosong."),
  jenis_kelamin: z.string().min(1, "Jenis Kelamin tidak boleh kosong."),
  nama_kontak_darurat: z
    .string()
    .min(1, "Nama Kontak Darurat tidak boleh kosong."),
  nomor_kontak_darurat: z
    .string()
    .min(1, "Nomor Kontak Darurat tidak boleh kosong."),
});

type registerFormType = UseFormReturn<z.infer<typeof registerSchema>>;

export { loginSchema, registerSchema, type registerFormType };
