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
import {
  useSubtematikKegiatan,
  useSubtematikKegiatanStore,
  type subtematikKegiatanType,
} from "@/stores/subtematikKegiatan";
import { useTematikKegiatan } from "@/stores/tematikKegiatan.store";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SubmissionSchema,
  type submissionFormType,
} from "@/schemas/submission.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCheck, Megaphone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const tabsvalue = ["tematik", "subtematik", "kegiatan", "paket"];

export function CreateSubmissionModal() {
  const form = useForm<submissionFormType>({
    resolver: zodResolver(SubmissionSchema),
    defaultValues: {
      tematik_kegiatan_id: "",
      subtematik_kegiatan_id: "",
      paket_kegiatan_id: "",
      jumlah_peserta: "",
    },
  });

  const tematik = useTematikKegiatan().useGlobalStore(
    (s) => s["tematikKegiatanData"]
  );
  const { createMutation: createSubTematik } = useSubtematikKegiatan();
  const { data: subTematik, setData } = useSubtematikKegiatanStore();
  const tematikId = form.watch().tematik_kegiatan_id;
  const subtematikId = form.watch().subtematik_kegiatan_id;

  const { query: paketKegiatan } = usePaketKegiatan(tematikId, subtematikId);

  const fetchSubtematik = async (id: string) => {
    await createSubTematik?.mutate(
      { tematik_kegiatan_id: id },
      {
        onSuccess: (data) => {
          setData(data.data as subtematikKegiatanType[]);
        },
      }
    );
  };

  const imgUrls = [Pana, Amico, Papa];
  const imgUrl2 = [Planting, Sun, Trip, Water, Protect, Health];
  const { modals, closeModal } = useModalStore();
  const [activeTab, setActiveTab] = useState("tematik");

  const onSubmit = (data: submissionFormType) => {
    console.log("🚀 Form Values:", data);
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
      <div className="flex flex-row justify-between gap-2">
        {tabsvalue.indexOf(activeTab) > 0 && (
          <Button
            className="bg-amber-400 hover:bg-amber-500 hover:scale-90"
            onClick={() =>
              tabsvalue.indexOf(activeTab) > 0 &&
              setActiveTab(tabsvalue[tabsvalue.indexOf(activeTab) - 1])
            }
          >
            Kembali
          </Button>
        )}
      </div>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              onChange={() =>
                                handleSelect(
                                  theme.id,
                                  field.onChange,
                                  "subtematik",
                                  () => fetchSubtematik(theme.id)
                                )
                              }
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
                        <Spinner />
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
                      {subTematik && subTematik?.length > 0 ? (
                        subTematik.map((sub, index) => (
                          <label key={sub.id} className="cursor-pointer group">
                            <input
                              type="radio"
                              value={sub.id}
                              checked={field.value === sub.id}
                              onChange={() =>
                                handleSelect(sub.id, field.onChange, "kegiatan")
                              }
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
                        <Spinner />
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
                  name="paket_kegiatan_id"
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
                              onChange={() =>
                                handleSelect(activity.id, field.onChange)
                              }
                              onClick={() =>
                                handleSelect(activity.id, field.onChange)
                              }
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
                                  name="jumlah_peserta"
                                  render={({ field: fieldJumlah }) => (
                                    <div>
                                      <Select
                                        value={fieldJumlah.value}
                                        onValueChange={fieldJumlah.onChange}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Pilih Jumlah Peserta" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {activity?.paket_kegiatan?.map(
                                            (option) => (
                                              <SelectItem
                                                key={option.id}
                                                value={option.jumlah_peserta.toString()}
                                              >
                                                {option.jumlah_peserta}
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </div>
                                  )}
                                />
                                <Button
                                  disabled={!form.watch().jumlah_peserta}
                                  className="bg-green-600 hover:bg-green-700 hover:scale-95 text-white rounded-md flex items-center justify-center text-sm w-full lg:w-1/4"
                                >
                                  Mulai Pengajuan
                                </Button>
                              </div>
                            )}
                          </label>
                        ))
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  )}
                />
                <FormMessage />
              </TabsContent>
            </Tabs>

            {/* Submit button */}
            {activeTab === "paket" && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-100"
                >
                  Submit
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
