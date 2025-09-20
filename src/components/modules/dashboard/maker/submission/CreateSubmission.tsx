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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModalStore } from "@/stores/allModal";
import { usePaketKegiatan } from "@/stores/paketKegiatan.store";
import { useSubtematikKegiatan } from "@/stores/subtematikKegiatan";
import { useTematikKegiatan } from "@/stores/tematikKegiatan.store";

import CountTextarea from "@/components/custom-ui/CounTextarea";
import CustomSelectArea from "@/components/custom-ui/CustomSelectArea";
import DatePicker from "@/components/custom-ui/DatePicker";
import FileUploadField from "@/components/custom-ui/FileUploadField";
import RequiredLabel from "@/components/custom-ui/RequiredLabel";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertToFormData } from "@/lib/convertToFormData";
import {
  SubmissionSchema,
  type submissionFormType,
} from "@/schemas/submission.schema";
import {
  usePengajuanKegiatan,
  type KomponenRabArrayTypes,
} from "@/stores/pengajuanKegiatan.store";
import type { FileType } from "@/types/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCheck, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const tabsvalue = ["tematik", "subtematik", "kegiatan", "paket", "rab"];

export function CreateSubmissionModal() {
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
  const { createMutation: createSubTematik, useGlobalStore: subTematikStore } =
    useSubtematikKegiatan();
  const subTematik = subTematikStore((s) => s["subTematikKegiatanData"]);
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

  const fetchRabPengajuanKegiatan = async (id?: string) => {
    if (createPengajuan?.data && !id) {
      setRab(pengajuanKegiatan?.data);
    } else {
      setRab(undefined);
    }
  };

  const fetchSubtematik = async (id: string) => {
    await createSubTematik?.mutate({ tematik_kegiatan_id: id });
  };

  const imgUrls = [Pana, Amico, Papa];
  const imgUrl2 = [Planting, Sun, Trip, Water, Protect, Health];
  const { modals, closeModal } = useModalStore();
  const [activeTab, setActiveTab] = useState("tematik");

  const onSubmit = async (values: submissionFormType) => {
    const formData = convertToFormData(values);
    formData.append(
      "tanggal_kegiatan",
      `${values.tanggal_kegiatan_awal} - ${values.tanggal_kegiatan_akhir}`
    );
    formData.append("waktu_kegiatan", "00:00 - 23:59");
    await createPengajuan?.mutate(formData);
  };

  const handleSelect = (
    value: string,
    fieldOnChange: (val: string) => void,
    nextTab?: string,
    callback?: () => void
  ) => {
    fieldOnChange(value);
    if (nextTab) setActiveTab(nextTab);
    if (callback) callback();
  };

  const handlePrevius = () => {
    setActiveTab(tabsvalue[tabsvalue.indexOf(activeTab) - 1]);
  };

  useEffect(() => {
    if (createPengajuan?.isSuccess) {
      setActiveTab("rab");
      fetchRabPengajuanKegiatan();
    }
    if (createPengajuan?.isError && rab?.komponen_rab) {
      setActiveTab("paket");
    }
  }, [createPengajuan?.isSuccess, createPengajuan?.isError, rab?.komponen_rab]);

  const Tablist = () => (
    <div className="flex flex-col items-center gap-2 mb-4">
      <TabsList className="bg-white/20 backdrop-blur-md p-1 rounded-lg flex flex-wrap gap-2 mb-8">
        {tabsvalue.map((item, index) => (
          <TabsTrigger
            key={index}
            value={item}
            className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-black px-4 py-2 rounded-md"
          >
            {item.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );

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
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-shadow-white mb-2">
                    PILIH TEMA
                  </h3>
                  <p className="text-sm text-shadow-white">
                    Pilih tema yang anda ingin ajukan
                  </p>
                </div>
                <Tablist />

                <FormField
                  control={form.control}
                  name="tematik_kegiatan_id"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tematik?.data && tematik?.data?.length > 0 ? (
                        tematik?.data?.map((theme, index) => (
                          <label
                            key={theme.id}
                            className="cursor-pointer group"
                          >
                            <input
                              type="radio"
                              value={theme.id}
                              checked={field.value === theme.id}
                              onChange={() => {}}
                              onClick={() =>
                                handleSelect(
                                  theme.id,
                                  field.onChange,
                                  "subtematik",
                                  () => fetchSubtematik(theme.id)
                                )
                              }
                              className="peer hidden"
                            />
                            <div
                              className="h-full border border-border rounded-xl p-6 transition-all duration-300 bg-card 
                              peer-checked:border-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400
                              group-hover:scale-105 group-hover:shadow-lg flex flex-col gap-4 items-center"
                            >
                              <img
                                src={imgUrls[index]}
                                alt="tema"
                                className="w-20 h-20 rounded-lg object-cover border border-border"
                              />
                              <h4 className="font-semibold text-card-foreground text-base text-center">
                                {theme.tematik_kegiatan}
                              </h4>
                              <p className="text-sm text-muted-foreground text-center">
                                {theme.deskripsi_tematik}
                              </p>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="col-span-3 flex justify-center">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  )}
                />
                <FormMessage />
              </TabsContent>

              {/* Tab Subtematik */}
              <TabsContent value="subtematik">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-shadow-white mb-2">
                    PILIH SUB TEMA
                  </h3>
                  <p className="text-sm text-shadow-white">
                    Pilih sub tema yang anda ingin ajukan
                  </p>
                </div>
                <Tablist />

                <FormField
                  control={form.control}
                  name="subtematik_kegiatan_id"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subTematik?.data && subTematik?.data?.length > 0 ? (
                        subTematik?.data?.map((sub, index) => (
                          <label key={sub.id} className="cursor-pointer group">
                            <input
                              type="radio"
                              value={sub.id}
                              checked={field.value === sub.id}
                              onChange={() => {}}
                              onClick={() =>
                                handleSelect(sub.id, field.onChange, "kegiatan")
                              }
                              className="peer hidden"
                            />

                            <div
                              className="h-full border border-border rounded-xl p-6 transition-all duration-300 bg-card 
                              peer-checked:border-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400
                              group-hover:scale-105 group-hover:shadow-lg flex flex-col gap-4 items-center"
                            >
                              <img
                                src={imgUrl2[index]}
                                alt="subtematik"
                                className="w-20 h-20 rounded-lg object-cover border border-border"
                              />
                              <h4 className="font-semibold text-card-foreground text-base text-center">
                                {sub.sub_tematik_kegiatan}
                              </h4>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="col-span-3 flex justify-center">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  )}
                />
                <FormMessage />
              </TabsContent>

              {/* Tab Kegiatan */}
              <TabsContent value="kegiatan">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-shadow-white mb-2">
                    PILIH KEGIATAN
                  </h3>
                  <p className="text-sm text-shadow-white">
                    Pilih kegiatan yang anda ingin ajukan
                  </p>
                </div>
                <Tablist />

                <FormField
                  control={form.control}
                  name="paket_kegiatan"
                  render={({ field }) => (
                    <div className="space-y-4 md:p-0 lg:p-8">
                      {paketKegiatan?.data?.data &&
                      paketKegiatan?.data?.data?.length > 0 ? (
                        paketKegiatan?.data?.data?.map((activity) => (
                          <label
                            key={activity.id}
                            className={`block border border-border rounded-lg p-4 cursor-pointer group bg-card transition-all ${
                              field.value === activity.id
                                ? "text-black"
                                : "text-muted-foreground"
                            } hover:scale-105`}
                          >
                            <input
                              type="radio"
                              value={activity.id}
                              checked={field.value === activity.id}
                              onChange={() => {}}
                              onClick={() =>
                                handleSelect(activity.id, field.onChange)
                              }
                              readOnly
                              className="peer hidden"
                            />
                            <div className="flex flex-between items-center justify-between">
                              <div className="flex gap-4">
                                <Megaphone
                                  className={`h-5 w-5 ${
                                    field.value === activity.id
                                      ? "text-[#17a449]"
                                      : "text-muted-foreground"
                                  } group-hover:text-primary`}
                                />
                                <span
                                  className={`font-semibold ${
                                    field.value === activity.id
                                      ? "text-[#17a449]"
                                      : "text-card-foreground"
                                  }`}
                                >
                                  {activity.jenis_kegiatan}
                                </span>
                              </div>
                              {field.value === activity.id ? (
                                <CheckCheck
                                  size={30}
                                  className="text-[#17a449]"
                                />
                              ) : (
                                <Check
                                  size={30}
                                  className="text-muted-foreground"
                                />
                              )}
                            </div>

                            {/* Jumlah Peserta */}
                            {field.value === activity.id && (
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                                <FormField
                                  control={form.control}
                                  name="paket_kegiatan_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <RequiredLabel required>
                                        Jumlah{" "}
                                        {activity.jenis_kegiatan.toLowerCase() ===
                                        "penanaman pohon"
                                          ? " Hektar"
                                          : " Orang"}
                                      </RequiredLabel>
                                      <FormControl>
                                        <Select
                                          value={field.value}
                                          onValueChange={(value) => {
                                            field.onChange(value);
                                            form.setValue(
                                              "jumlah_peserta",
                                              String(
                                                activity?.paket_kegiatan?.find(
                                                  (item) => item.id === value
                                                )?.jumlah_peserta
                                              )
                                            );
                                          }}
                                        >
                                          <SelectTrigger
                                            className="w-full"
                                            defaultChecked
                                          >
                                            <SelectValue placeholder="Pilih Jumlah" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {activity?.paket_kegiatan?.map(
                                              (option) => (
                                                <SelectItem
                                                  key={option.id}
                                                  value={option.id}
                                                >
                                                  {option.jumlah_peserta}
                                                </SelectItem>
                                              )
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="button"
                                  disabled={!form.watch().jumlah_peserta}
                                  className="bg-green-600 hover:bg-green-700 hover:scale-95 text-white rounded-md flex items-center justify-center text-sm w-full lg:w-1/4"
                                  onChange={() => {}}
                                  onClick={() =>
                                    handleSelect(
                                      activity.id,
                                      field.onChange,
                                      "paket"
                                    )
                                  }
                                >
                                  Mulai Pengajuan
                                </Button>
                              </div>
                            )}
                          </label>
                        ))
                      ) : (
                        <div className="col-span-3 flex justify-center">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  )}
                />
                <FormMessage />
              </TabsContent>

              {/* Tab Paket */}
              <TabsContent value="paket">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-shadow-white mb-2">
                    PAKET KEGIATAN
                  </h3>
                  <p className="text-xl text-amber-400">
                    {
                      paketKegiatan?.data?.data?.find(
                        (item) => item.id === form.watch().paket_kegiatan_id
                      )?.jenis_kegiatan
                    }{" "}
                    {form.watch().jumlah_peserta}
                    {paketKegiatan?.data?.data
                      ?.find(
                        (item) => item.id === form.watch().paket_kegiatan_id
                      )
                      ?.jenis_kegiatan.toLowerCase() === "penanaman pohon"
                      ? " Hektar"
                      : paketKegiatan?.data?.data
                          ?.find(
                            (item) => item.id === form.watch().paket_kegiatan_id
                          )
                          ?.jenis_kegiatan.toLowerCase() === undefined
                      ? ""
                      : " Orang"}
                  </p>
                </div>
                <Tablist />

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
                          <RequiredLabel required>
                            Tanggal Awal Kegiatan
                          </RequiredLabel>
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
                          <RequiredLabel required>
                            Tanggal Akhir Kegiatan
                          </RequiredLabel>
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
              </TabsContent>

              {/* Tab Paket rab */}
              <TabsContent value="rab">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-shadow-white mb-2">
                    PAKET KEGIATAN
                  </h3>
                  <p className="text-xl text-amber-400">
                    {
                      paketKegiatan?.data?.data?.find(
                        (item) => item.id === form.watch().paket_kegiatan_id
                      )?.jenis_kegiatan
                    }
                  </p>
                </div>
                <Tablist />

                <div className="bg-card p-6 rounded-lg space-y-4">
                  <div className="overflow-x-auto border border-border rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted">
                          <th className="text-left p-3 font-semibold text-foreground min-w-[40px]">
                            No
                          </th>
                          <th className="text-left p-3 font-semibold text-foreground min-w-[120px]">
                            Deskripsi
                          </th>
                          <th className="text-left p-3 font-semibold text-foreground min-w-[80px]">
                            Satuan
                          </th>
                          <th className="text-right p-3 font-semibold text-foreground min-w-[100px]">
                            Harga Unit
                          </th>
                          <th className="text-right p-3 font-semibold text-foreground min-w-[60px]">
                            Jumlah
                          </th>
                          <th className="text-right p-3 font-semibold text-foreground min-w-[100px]">
                            Harga Total
                          </th>
                        </tr>
                      </thead>
                      {/* <tbody>
                        {budgetData.map((category) => (
                          <>
                            <tr key={category.category} className="bg-muted">
                              <td className="p-3 font-semibold text-foreground">
                                {category.category}
                              </td>
                              <td
                                className="p-3 font-semibold text-foreground"
                                colSpan={5}
                              >
                                {category.categoryName}
                              </td>
                            </tr>
                            {category.items.map((item) => (
                              <tr
                                key={`${category.category}-${item.no}`}
                                className="border-b border-border hover:bg-muted/20 transition-colors"
                              >
                                <td className="p-3 text-muted-foreground">
                                  {item.no}
                                </td>
                                <td className="p-3 text-foreground">
                                  {item.description}
                                </td>
                                <td className="p-3 text-foreground">
                                  {item.unit}
                                </td>
                                <td className="p-3 text-right text-foreground">
                                  {formatCurrency(item.unitPrice)}
                                </td>
                                <td className="p-3 text-right text-foreground">
                                  {item.quantity}
                                </td>
                                <td className="p-3 text-right font-semibold text-foreground">
                                  {formatCurrency(item.total)}
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}
                        <tr className="border-t-2 border-border bg-muted">
                          <td className="p-3" colSpan={5}></td>
                          <td className="p-3 text-right font-bold text-lg text-foreground">
                            TOTAL: {formatCurrency(totalBudget)}
                          </td>
                        </tr>
                      </tbody> */}
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Submit button */}
            <div className="flex flex-col flex-1 bg-card p-6 rounded-lg border space-y-1 text-muted-foreground text-sm gap-4">
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
                      (item) => item.id === form.watch().subtematik_kegiatan_id
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
                      ?.find((item) => item.id === form.watch().paket_kegiatan)
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
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
