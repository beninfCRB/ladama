import { z } from "zod";

const SubmissionSchema = z.object({
  tematik_kegiatan_id: z
    .string()
    .min(1, "Tematik kegiatan tidak boleh kosong."),
  subtematik_kegiatan_id: z
    .string()
    .min(1, "Subtematik kegiatan tidak boleh kosong."),
  paket_kegiatan: z.string().optional(),
  paket_kegiatan_id: z.string().min(1, "Paket kegiatan tidak boleh kosong."),
  jumlah_peserta: z.string().optional(),
  nomor_pengajuan: z.string().optional().nullable(),
  judul_pengajuan_kegiatan: z
    .string()
    .min(1, "Judul pengajuan kegiatan tidak boleh kosong."),
  ruang_lingkup_kegiatan: z
    .string()
    .min(1, "Ruang lingkup kegiatan tidak boleh kosong."),
  tujuan_kegiatan: z.string().min(1, "Tujuan kegiatan tidak boleh kosong."),
  proposal_kegiatan: z.string().min(1, "Proposal kegiatan tidak boleh kosong."),
  waktu_kegiatan: z.string().optional().nullable(),
  tanggal_kegiatan: z.string().optional().nullable(),
  tanggal_kegiatan_awal: z
    .string()
    .min(1, "Tanggal kegiatan tidak boleh kosong."),
  tanggal_kegiatan_akhir: z
    .string()
    .min(1, "Tanggal kegiatan tidak boleh kosong."),
  alamat_kegiatan: z.string().min(1, "Alamat kegiatan tidak boleh kosong."),
  provinsi_kegiatan: z.string().min(1, "Provinsi kegiatan tidak boleh kosong."),
  kabupaten_kegiatan: z
    .string()
    .min(1, "Kabupaten kegiatan tidak boleh kosong."),
  kecamatan_kegiatan: z
    .string()
    .min(1, "Kecamatan kegiatan tidak boleh kosong."),
  kelurahan_kegiatan: z
    .string()
    .min(1, "Kelurahan kegiatan tidak boleh kosong."),
  fileDocument: z
    .custom<FileList | File | null>(
      (val) => val !== null && (val instanceof FileList || val instanceof File),
      { message: "File tidak boleh kosong" }
    )
    .refine(
      (file) =>
        file !== null &&
        (file instanceof File
          ? [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file.type)
          : [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file[0].type)),
      "Tipe file harus .doc, .docx, atau .pdf"
    )
    .refine(
      (file) =>
        file !== null &&
        (file instanceof File
          ? file.size <= 10 * 1024 * 1024
          : file[0].size <= 10 * 1024 * 1024),
      "Ukuran file maksimal 10MB"
    ),
});

type submissionFormType = z.infer<typeof SubmissionSchema>;

export { SubmissionSchema, type submissionFormType };
