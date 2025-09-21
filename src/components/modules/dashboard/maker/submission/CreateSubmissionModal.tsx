"use client";

import Amico from "@/assets/submission/amico.png";
import Health from "@/assets/submission/health.png";
import Pana from "@/assets/submission/pana.png";
import Papa from "@/assets/submission/papa.png";
import Planting from "@/assets/submission/planting.png";
import Protect from "@/assets/submission/protect.png";
import Sun from "@/assets/submission/sun.png";
import Trip from "@/assets/submission/trip.png";
import Water from "@/assets/submission/water.png";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useModalStore } from "@/stores/allModal";
import { usePaketKegiatan } from "@/stores/paketKegiatan.store";
import { useSubtematikKegiatan } from "@/stores/subtematikKegiatan";
import { useTematikKegiatan } from "@/stores/tematikKegiatan.store";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { convertToFormData } from "@/lib/convertToFormData";
import { fetchFileFromUrl } from "@/lib/fileUrlBlob";
import {
  SubmissionSchema,
  type submissionFormType,
} from "@/schemas/submission.schema";
import type { DraftPengajuanKegiatanType } from "@/stores/draftPengajuanKegiatan.store";
import {
  usePengajuanKegiatan,
  useRabPengajuanKegiatan,
  type KomponenRabArrayTypes,
} from "@/stores/pengajuanKegiatan.store";
import type { FileType } from "@/types/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import FormKegiatan from "./FormKegiatan";
import FormPaketKegiatan from "./FormPaketKegiatan";
import FormSubtematikKegiatan from "./FormSubtematikKegiatan";
import FormTematikKegiatan from "./FormTematikKegiatan";
import TableRab from "./TableRab";
import { tabsvalue } from "@/types/static";

interface CreateSubmissionModalProps {
  isDraft: boolean;
  draftPengajuanKegiatan?: DraftPengajuanKegiatanType;
}

export function CreateSubmissionModal({
  isDraft,
  draftPengajuanKegiatan,
}: CreateSubmissionModalProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [file, setFile] = useState<FileType | null>(null);
  const form = useForm<submissionFormType>({
    resolver: zodResolver(SubmissionSchema),
    defaultValues: {
      tematik_kegiatan_id: "",
      subtematik_kegiatan_id: "",
      paket_kegiatan_id: "",
      jumlah_peserta: "",
      judul_pengajuan_kegiatan: "",
      alamat_kegiatan: "",
      provinsi_kegiatan: "",
      kabupaten_kegiatan: "",
      kecamatan_kegiatan: "",
      kelurahan_kegiatan: "",
      tanggal_kegiatan_awal: "",
      tanggal_kegiatan_akhir: "",
    },
  });

  const tematik = useTematikKegiatan().useGlobalStore(
    (s) => s["tematikKegiatanData"]
  );
  const subTematik = useSubtematikKegiatan().useGlobalStore(
    (s) => s["subTematikKegiatanData"]
  );
  const tematikId = form.watch().tematik_kegiatan_id;
  const subtematikId = form.watch().subtematik_kegiatan_id;
  const { query: paketKegiatan } = usePaketKegiatan(tematikId, subtematikId);
  const {
    createMutation: createPengajuan,
    useGlobalStore: pengajuanKegiatanStore,
  } = usePengajuanKegiatan();
  const pengajuanKegiatan = pengajuanKegiatanStore(
    (s) => s["pengajuanKegiatanData"]
  );
  const [rab, setRab] = useState<KomponenRabArrayTypes | undefined>();
  const { updateMutation: updateRab } = useRabPengajuanKegiatan();
  const navigate = useNavigate();

  const handleRabPengajuanKegiatan = useCallback(async () => {
    if (pengajuanKegiatan?.data?.nomor_pengajuan && rab) {
      const flattenedRab = Object.values(rab.komponen_rab)
        .flat()
        .map(({ id_komponen, harga_unit, qty }) => ({
          id_komponen,
          harga_unit,
          qty,
        }));

      await updateRab?.mutate({
        id: pengajuanKegiatan.data.nomor_pengajuan,
        payload: {
          komponen_rab: flattenedRab,
        },
      });
    }
  }, [rab, pengajuanKegiatan?.data, updateRab]);

  const komponenRab = pengajuanKegiatan?.data?.komponen_rab;

  const fetchRabPengajuanKegiatan = useCallback(async () => {
    if (createPengajuan?.data?.data && isDraft) {
      (
        Object.entries(createPengajuan.data.data.pengajuan_kegiatan) as [
          keyof submissionFormType,
          submissionFormType[keyof submissionFormType]
        ][]
      ).forEach(([key, value]) => {
        form.setValue(key, value);
      });
    }

    setRab({
      komponen_rab: {
        "Lain-lain": komponenRab?.["Lain-lain"] ?? [],
        "Jasa Profesi": komponenRab?.["Jasa Profesi"] ?? [],
        Transportasi: komponenRab?.["Transportasi"] ?? [],
        Perlengkapan: komponenRab?.["Perlengkapan"] ?? [],
        Konsumsi: komponenRab?.["Konsumsi"] ?? [],
        "Sewa Ruangan": komponenRab?.["Sewa Ruangan"] ?? [],
      },
    });
  }, [createPengajuan?.data?.data, komponenRab, form, setRab, isDraft]);

  const imgUrls = [Pana, Amico, Papa];
  const imgUrl2 = [Planting, Sun, Trip, Water, Protect, Health];
  const { modals, closeModal } = useModalStore();
  const [activeTab, setActiveTab] = useState("tematik");

  const onSubmit = useCallback(
    async (values: submissionFormType) => {
      const formData = convertToFormData(values);
      formData.append(
        "tanggal_kegiatan",
        `${values.tanggal_kegiatan_awal} - ${values.tanggal_kegiatan_akhir}`
      );
      formData.append("waktu_kegiatan", "00:00 - 23:59");
      await createPengajuan?.mutate(formData);
    },
    [createPengajuan]
  );

  const handlePrevius = () => {
    setActiveTab(tabsvalue[tabsvalue.indexOf(activeTab) - 1]);
  };

  useEffect(() => {
    if (createPengajuan?.isSuccess) {
      fetchRabPengajuanKegiatan();
    }
    if (createPengajuan?.isError) {
      setActiveTab("paket");
    }
  }, [
    createPengajuan?.isSuccess,
    createPengajuan?.isError,
    fetchRabPengajuanKegiatan,
  ]);

  useEffect(() => {
    if (updateRab?.isSuccess) {
      closeModal("CreateSubmission");
      navigate(0);
    }
  }, [updateRab?.isSuccess, closeModal, navigate]);

  useEffect(() => {
    if (isDraft && draftPengajuanKegiatan) {
      let fileDocument: File | null = null;

      const blob = async () => {
        if (draftPengajuanKegiatan.fileDocument?.[0]) {
          const fileMeta = draftPengajuanKegiatan.fileDocument[0];
          fileDocument = await fetchFileFromUrl(
            fileMeta.file_path,
            fileMeta.file_name
          );
        }
      };

      blob();

      const mappedValues: submissionFormType = {
        tematik_kegiatan_id: draftPengajuanKegiatan.tematik_kegiatan_id,
        subtematik_kegiatan_id: draftPengajuanKegiatan.sub_tematik_kegiatan_id,
        paket_kegiatan_id:
          draftPengajuanKegiatan.paket_kegiatan.paket_kegiatan.id,
        jumlah_peserta: String(draftPengajuanKegiatan.jumlah_peserta),
        judul_pengajuan_kegiatan:
          draftPengajuanKegiatan.judul_pengajuan_kegiatan,
        ruang_lingkup_kegiatan: draftPengajuanKegiatan.ruang_lingkup_kegiatan,
        tujuan_kegiatan: draftPengajuanKegiatan.tujuan_kegiatan,
        proposal_kegiatan: draftPengajuanKegiatan.proposal_kegiatan,
        alamat_kegiatan: draftPengajuanKegiatan.alamat_kegiatan,
        provinsi_kegiatan: String(draftPengajuanKegiatan.provinsi_kegiatan),
        kabupaten_kegiatan: String(draftPengajuanKegiatan.kabupaten_kegiatan),
        kecamatan_kegiatan: String(draftPengajuanKegiatan.kecamatan_kegiatan),
        kelurahan_kegiatan: String(draftPengajuanKegiatan.kelurahan_kegiatan),
        tanggal_kegiatan_awal:
          draftPengajuanKegiatan.tanggal_kegiatan.split(" - ")[0],
        tanggal_kegiatan_akhir:
          draftPengajuanKegiatan.tanggal_kegiatan.split(" - ")[1],
        nomor_pengajuan: draftPengajuanKegiatan.nomor_pengajuan,
        waktu_kegiatan: draftPengajuanKegiatan.waktu_kegiatan,
        tanggal_kegiatan: draftPengajuanKegiatan.tanggal_kegiatan,
        fileDocument,
      };
      onSubmit(mappedValues);
    }
  }, [isDraft, draftPengajuanKegiatan, onSubmit]);

  return (
    <Dialog
      open={modals["CreateSubmission"]}
      onOpenChange={(open) => !open && closeModal("CreateSubmission")}
    >
      <DialogContent className="w-full h-auto max-w-[95vw] lg:max-w-screen-xl max-h-[90vh] overflow-y-auto mx-auto bg-linear-to-br from-[#17a449] to-[#A3C537] text-white p-4 sm:p-6 lg:p-8 rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-8">
            <span>BUAT PENGAJUAN BARU</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("❌ Semua error:", errors);
            })}
            className="space-y-6"
          >
            <Tabs value={activeTab}>
              {/* Tab Tematik */}
              <TabsContent value="tematik">
                <FormTematikKegiatan
                  form={form}
                  imgUrls={imgUrls}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>

              {/* Tab Subtematik */}
              <TabsContent value="subtematik">
                <FormSubtematikKegiatan
                  form={form}
                  imgUrls2={imgUrl2}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>

              {/* Tab Kegiatan */}
              <TabsContent value="kegiatan">
                <FormKegiatan
                  form={form}
                  setActiveTab={setActiveTab}
                  paketKegiatan={paketKegiatan?.data?.data}
                />
              </TabsContent>

              {/* Tab Paket */}
              <TabsContent value="paket">
                <FormPaketKegiatan
                  form={form}
                  file={file}
                  setFile={setFile}
                  paketKegiatan={paketKegiatan?.data?.data}
                />
              </TabsContent>

              {/* Tab Paket rab */}
              <TabsContent value="rab">
                <TableRab
                  rab={rab}
                  setRab={setRab}
                  form={form}
                  paketKegiatan={paketKegiatan?.data?.data}
                />
              </TabsContent>
            </Tabs>

            {/* Submit button */}
            <div className="flex flex-col flex-1 bg-card p-6 rounded-lg border space-y-1 text-muted-foreground text-sm gap-4">
              {["tematik", "subtematik", "kegiatan", "paket"].includes(
                activeTab
              ) && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-[#17a449] text-sm">
                    <span className="text-muted-foreground">Tematik :</span>
                    <span className="text-[#17a449] text-sm">
                      {tematik?.data?.find(
                        (item) => item.id === form.watch().tematik_kegiatan_id
                      )?.tematik_kegiatan ?? "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#17a449] text-sm">
                    <span className="text-muted-foreground">Subtematik :</span>
                    <span className="text-[#17a449] text-sm">
                      {subTematik?.data?.find(
                        (item) =>
                          item.id === form.watch().subtematik_kegiatan_id
                      )?.sub_tematik_kegiatan ?? "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#17a449] text-sm">
                    <span className="text-muted-foreground">Kegiatan :</span>
                    <span className="text-[#17a449] text-sm">
                      {paketKegiatan?.data?.data?.find(
                        (item) => item.id === form.watch().paket_kegiatan
                      )?.jenis_kegiatan ?? "-"}{" "}
                      {form.watch().jumlah_peserta ?? "-"}
                      {paketKegiatan?.data?.data
                        ?.find(
                          (item) => item.id === form.watch().paket_kegiatan
                        )
                        ?.jenis_kegiatan.toLowerCase() === "penanaman pohon"
                        ? " Hektar"
                        : paketKegiatan?.data?.data
                            ?.find(
                              (item) => item.id === form.watch().paket_kegiatan
                            )
                            ?.jenis_kegiatan.toLowerCase() === undefined
                        ? ""
                        : " Orang"}
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "rab" && (
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                  <Checkbox
                    id="toggle-2"
                    checked={checked}
                    onCheckedChange={(value) => setChecked(value === true)}
                    className="data-[state=checked]:border-green-700 data-[state=checked]:bg-green-700 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Pernyataan
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Dengan ini saya menyatakan bahwa informasi yang
                      disampaikan adalah benar dan bahwa kegiatan ini belum
                      didanai oleh program lain
                    </p>
                  </div>
                </Label>
              )}
              <div className="flex lg:justify-end gap-4 w-full">
                {tabsvalue.indexOf(activeTab) > 0 && (
                  <Button
                    type="button"
                    className="bg-amber-400 hover:bg-amber-500 hover:scale-90 rounded-xl h-10"
                    onClick={() => handlePrevius()}
                  >
                    Kembali
                  </Button>
                )}
                {activeTab === "paket" && (
                  <ShinyButton
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-10 flex items-center justify-center font-medium"
                    disabled={createPengajuan?.isPending}
                  >
                    {createPengajuan?.isPending ? <Spinner /> : "Berikutnya"}
                  </ShinyButton>
                )}
                {activeTab === "rab" && (
                  <ShinyButton
                    type="submit"
                    className={`${
                      checked ? "bg-green-600" : "bg-gray-600"
                    } hover:bg-green-700 text-white rounded-xl h-10 flex items-center justify-center font-medium`}
                    disabled={updateRab?.isPending || !checked}
                    onClick={handleRabPengajuanKegiatan}
                  >
                    {updateRab?.isPending ? <Spinner /> : "Submit"}
                  </ShinyButton>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
