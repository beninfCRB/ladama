import CountTextarea from "@/components/custom-ui/CounTextarea";
import CustomSelectArea from "@/components/custom-ui/CustomSelectArea";
import CustomTablist from "@/components/custom-ui/CustomTablist";
import DatePicker from "@/components/custom-ui/DatePicker";
import FileUploadField from "@/components/custom-ui/FileUploadField";
import RequiredLabel from "@/components/custom-ui/RequiredLabel";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { submissionFormReturnType } from "@/schemas/submission.schema";
import type { PaketKegaiatanTypes } from "@/stores/paketKegiatan.store";
import type { FileType } from "@/types/upload";

interface FormPaketKegiatanProps {
  form: submissionFormReturnType;
  file: FileType | null;
  setFile: (value: FileType | null) => void;
  paketKegiatan?: Array<PaketKegaiatanTypes>;
}

function FormPaketKegiatan({
  form,
  file,
  setFile,
  paketKegiatan,
}: FormPaketKegiatanProps) {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-shadow-white mb-2">
          PAKET KEGIATAN
        </h3>
        <p className="text-xl text-amber-400">
          {
            paketKegiatan?.find(
              (item) => item.id === form.watch().paket_kegiatan_id
            )?.jenis_kegiatan
          }{" "}
          {form.watch().jumlah_peserta}
          {paketKegiatan
            ?.find((item) => item.id === form.watch().paket_kegiatan_id)
            ?.jenis_kegiatan.toLowerCase() === "penanaman pohon"
            ? " Hektar"
            : paketKegiatan
                ?.find((item) => item.id === form.watch().paket_kegiatan_id)
                ?.jenis_kegiatan.toLowerCase() === undefined
            ? ""
            : " Orang"}
        </p>
      </div>
      <CustomTablist />

      <div className="relative bg-card p-6 rounded-lg overflow-hidden space-y-4 text-black">
        <FormField
          control={form.control}
          name="judul_pengajuan_kegiatan"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required>Judul kegiatan</RequiredLabel>
              <FormControl className="h-10">
                <Input
                  {...field}
                  type="text"
                  placeholder="Masukkan judul kegiatan"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CountTextarea
          name="alamat_kegiatan"
          label="Alamat Kegiatan"
          rows={3}
          maxChars={250}
          control={form.control}
          placeholder="Masukkan alamat kegiatan"
        />

        <CustomSelectArea
          form={form}
          required
          provinsiField="provinsi_kegiatan"
          kabupatenField="kabupaten_kegiatan"
          kecamatanField="kecamatan_kegiatan"
          kelurahanField="kelurahan_kegiatan"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="tanggal_kegiatan_awal"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required>Tanggal Awal Kegiatan</RequiredLabel>
                <FormControl className="h-10">
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholder="Pilih tanggal awal kegiatan"
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tanggal_kegiatan_akhir"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required>Tanggal Akhir Kegiatan</RequiredLabel>
                <FormControl className="h-10">
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholder="Pilih tanggal akhir kegiatan"
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <CountTextarea
          name="proposal_kegiatan"
          label="Latar Belakang Kegiatan"
          rows={6}
          maxChars={800}
          control={form.control}
          className="h-34"
          placeholder="Masukkan latar belakang kegiatan"
        />

        <CountTextarea
          name="tujuan_kegiatan"
          label="Tujuan Kegiatan"
          rows={6}
          maxChars={800}
          control={form.control}
          className="h-34"
          placeholder="Masukkan Tujuan kegiatan"
        />

        <CountTextarea
          name="ruang_lingkup_kegiatan"
          label="Ruang Lingkup Kegiatan"
          rows={6}
          maxChars={800}
          control={form.control}
          className="h-34"
          placeholder="Masukkan Ruang Lingkup kegiatan"
        />

        <FileUploadField
          name="fileDocument"
          control={form.control}
          label="Unggah Dokumen Lampiran"
          description="(Format: PDF, DOC, DOCX, Max 10 MB)"
          mode="document"
          valueFile={file}
          onFileChange={(files) => {
            if (files?.[0]) {
              const f = files[0];
              setFile({
                name: f.name,
                url: URL.createObjectURL(f),
                type: f.type,
              });
            } else {
              setFile(null);
            }
          }}
        />

        <BorderBeam
          borderWidth={4}
          duration={12}
          size={2000}
          delay={4}
          reverse
          className="from-transparent via-amber-400 to-transparent"
        />
      </div>
    </>
  );
}

export default FormPaketKegiatan;
