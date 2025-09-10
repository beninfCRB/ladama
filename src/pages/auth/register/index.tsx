import logo from "@/assets/logo.svg";
import CustomSelect from "@/components/custom-ui/CustomSelect";
import CustomSelectArea from "@/components/custom-ui/CustomSelectArea";
import DatePicker from "@/components/custom-ui/DatePicker";
import FileUploadField from "@/components/custom-ui/FileUploadField";
import RequiredLabel from "@/components/custom-ui/RequiredLabel";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { registerSchema } from "@/schemas/auth.schema";
import { useKodeVerifikasi, useRegister } from "@/stores/auth.store";
import {
  useJenisKelompok,
  type JenisKelompokStoreTypes,
} from "@/stores/jenisKelompok.store";
import type { JenisKelamin } from "@/types/static";
import type { FileType } from "@/types/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CreditCard, FileText, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const navigationSteps = [
  {
    id: 1,
    title: "Detail Kelompok/Individu",
    subtitle: "Lengkapi data kelompok/perorangan",
    icon: Users,
    active: true,
  },
  {
    id: 2,
    title: "Detail Penanggung Jawab",
    subtitle: "Lengkapi data diri penanggung jawab kelompok/perorangan",
    icon: FileText,
    active: false,
  },
  {
    id: 3,
    title: "Unggah KTP",
    subtitle: "Unggah KTP penanggung jawab kelompok/perorangan",
    icon: CreditCard,
    active: false,
  },
];

function AuthRegister() {
  const { query: jenisKelompok } = useJenisKelompok();
  const { createMutation: register } = useRegister();
  const { createMutation: verificationCode } = useKodeVerifikasi();
  const [activeTab, setActiveTab] = useState("step1");
  const [file, setFile] = useState<FileType | null>(null);
  const [image, setImage] = useState<FileType | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    shouldUnregister: false,
    defaultValues: {
      jenis_kelompok_masyarakat_id: "",
      kelompok_masyarakat: "",
      profil_kelompok: null,
      foto_ktp: null,
      nama_pic: "",
      nomor_identitas_pic: "",
      nomor_npwp_pic: "",
      alamat_pic: "",
      provinsi_pic: "",
      kabupaten_pic: "",
      kecamatan_pic: "",
      kelurahan_pic: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      agama_id: "",
      status_perkawinan_id: "",
      nama_gadis_ibu_kandung: "",
      jenis_pekerjaan_id: "",
      nohp_pic: "",
      email_pic: "",
      kode_aktivasi: "",
      provinsi_kelompok_masyarakat_id: "",
      kabupaten_kelompok_masyarakat_id: "",
      kecamatan_kelompok_masyarakat_id: "",
      kelurahan_kelompok_masyarakat_id: "",
      pendidikan: "",
      jenis_kelamin: "",
      nama_kontak_darurat: "",
      nomor_kontak_darurat: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    const formData = new FormData();
  }

  const handleTabChange = async (value: string) => {
    if (activeTab === "step1") {
      const isValid = await form.trigger([
        "jenis_kelompok_masyarakat_id",
        "kelompok_masyarakat",
        "profil_kelompok",
        "provinsi_kelompok_masyarakat_id",
        "kabupaten_kelompok_masyarakat_id",
        "kecamatan_kelompok_masyarakat_id",
        "kelurahan_kelompok_masyarakat_id",
      ]);
      if (isValid) {
        setActiveTab(value);
      }
    } else if (activeTab === "step2") {
      const isValid = await form.trigger([
        "nama_pic",
        "nomor_identitas_pic",
        "nomor_npwp_pic",
        "provinsi_pic",
        "kabupaten_pic",
        "kecamatan_pic",
        "kelurahan_pic",
        "tempat_lahir",
        "tanggal_lahir",
        "jenis_kelamin",
        "alamat_pic",
        "nohp_pic",
        "email_pic",
        "nomor_kontak_darurat",
        "nama_kontak_darurat",
        "kode_aktivasi",
      ]);
      if (isValid) {
        // const values = form.getValues();
        // const formData = convertToFormData<Partial<registerFormType>>(values);
        // createMutation.mutate(formData, {
        //   onSuccess: () => {
        //     setActiveTab("step3");
        //   },
        // });
      }
    } else if (activeTab === "step3") {
      const isValid = await form.trigger(["foto_ktp"]);
      if (isValid) {
        // const values = form.getValues();
        // const formData = convertToFormData<Partial<registerFormType>>(values);
        // createMutation.mutate(formData);
      }
    }
  };

  const kodeAktivasi = async () => {
    await verificationCode.mutate({ email_pic: form.getValues("email_pic") });
  };

  const goBack = (value: string) => {
    setActiveTab(value);
  };

  const getUpdatedNavigationSteps = () => {
    return navigationSteps.map((step) => ({
      ...step,
      active: activeTab === `step${step.id}`,
    }));
  };

  const TimelineProgress = () => {
    const currentStep = Number.parseInt(activeTab.replace("step", ""));

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>

          {navigationSteps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }
                  pointer-events-none`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={`text-xs font-medium 
                    ${isActive ? "text-green-600" : "text-gray-500"}
                    pointer-events-none`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Navigation Steps */}
      <div className="w-full lg:w-1/3 bg-white p-4 lg:p-6 xl:p-8 border-r border-gray-200 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        {/* Logo */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-2">
            <img
              className="dark:invert"
              src={logo}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* Navigation Steps with Timeline */}
        <div className="space-y-6 lg:space-y-8 relative px-4 pr-0 pl-8">
          {getUpdatedNavigationSteps().map((step) => (
            <div key={step.id} className="flex items-start gap-4 relative">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center relative z-10 cursor-pointer transition-colors ${
                  step.active
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
                onClick={() => handleTabChange(`step${step.id}`)}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium text-base cursor-pointer ${
                    step.active ? "text-gray-900" : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange(`step${step.id}`)}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-12 lg:mt-16 space-y-3 text-sm">
          <p className="text-gray-600 leading-relaxed">
            Data yang Anda inputkan hanya akan digunakan untuk keperluan yang
            dimaksud dan tidak akan disalahgunakan atau dibagikan
          </p>
          <div className="space-y-2">
            <a href="#" className="block text-green-600 hover:underline">
              Panduan Registrasi
            </a>
            <a href="#" className="block text-green-600 hover:underline">
              Petunjuk Teknis Layanan Dana Masyarakat untuk Lingkungan
            </a>
            <a href="#" className="block text-green-600 hover:underline italic">
              Frequently Asked Question (FAQ)
            </a>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 lg:w-2/3 bg-linear-to-br from-green-500 to-[#A3C537] p-2 lg:p-4 xl:p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Card className="w-full shadow-xl">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <CardHeader className="pb-6">
                <div className="text-sm text-green-600 font-medium">
                  Daftar Akun
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {activeTab === "step1" && "Detail Kelompok"}
                  {activeTab === "step2" && "Detail Penanggung Jawab"}
                  {activeTab === "step3" && "Unggah KTP"}
                </CardTitle>
                <div className="text-sm text-gray-500">
                  LANGKAH
                  {activeTab === "step1"
                    ? "1"
                    : activeTab === "step2"
                    ? "2"
                    : "3"}
                  DARI 3
                </div>
                <TimelineProgress />
              </CardHeader>

              {/* Step 1: Detail Kelompok */}
              <TabsContent value="step1" className="mt-0">
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 mb-4"
                    >
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="jenis_kelompok_masyarakat_id"
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>
                                Jenis Kelompok
                              </RequiredLabel>
                              <FormControl>
                                <CustomSelect<JenisKelompokStoreTypes>
                                  placeholder="Pilih jenis kelompok"
                                  data={jenisKelompok.data?.data}
                                  fieldSetValue="id"
                                  fieldName="jenis_kelompok_masyarakat"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="kelompok_masyarakat"
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>
                                Kelompok Masyarakat
                              </RequiredLabel>
                              <FormControl className="h-10">
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Masukkan kelompok masyarakat"
                                  value={field.value || ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value.toUpperCase())
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <CustomSelectArea
                        form={form}
                        required
                        provinsiField="provinsi_kelompok_masyarakat_id"
                        kabupatenField="kabupaten_kelompok_masyarakat_id"
                        kecamatanField="kecamatan_kelompok_masyarakat_id"
                        kelurahanField="kelurahan_kelompok_masyarakat_id"
                      />

                      <FileUploadField
                        name="profil_kelompok"
                        control={form.control}
                        label="Unggah Dokumen Profil Kelompok"
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

                      <div className="flex items-center justify-center">
                        <InteractiveHoverButton
                          className="bg-green-600 hover:bg-green-700 text-white rounded-md h-10 w-2/4 flex items-center justify-center font-medium"
                          onClick={() => handleTabChange("step2")}
                        >
                          Berikutnya
                        </InteractiveHoverButton>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>

              {/* Step 2: Detail Penanggung Jawab */}
              <TabsContent value="step2" className="mt-0">
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 mb-4"
                    >
                      <div className="space-y-2">
                        <FormField
                          name="nama_pic"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>
                                Nama Lengkap
                              </RequiredLabel>
                              <FormControl className="h-10">
                                <Input
                                  placeholder="Masukkan nama lengkap"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          name="nomor_identitas_pic"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>NIK</RequiredLabel>
                              <FormControl className="h-10">
                                <Input
                                  {...field}
                                  placeholder="Masukkan NIK"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={16}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    field.onChange(numericValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          name="nomor_npwp_pic"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>NPWP</RequiredLabel>
                              <FormControl className="h-10">
                                <Input
                                  {...field}
                                  placeholder="Masukkan NPWP"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={16}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    field.onChange(numericValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            name="tempat_lahir"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <RequiredLabel required>
                                  Tempat Lahir
                                </RequiredLabel>
                                <FormControl className="h-10">
                                  <Input
                                    placeholder="Tempat lahir"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            name="tanggal_lahir"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <RequiredLabel required>
                                  Tanggal Lahir
                                </RequiredLabel>
                                <FormControl className="h-10">
                                  <DatePicker
                                    value={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onChange={(date) =>
                                      field.onChange(date?.toISOString())
                                    }
                                    placeholder="Pilih tanggal lahir"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <FormField
                          name="jenis_kelamin"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>
                                Jenis Kelamin
                              </RequiredLabel>
                              <FormControl className="h-10">
                                <CustomSelect<JenisKelamin>
                                  placeholder="Pilih jenis kelamin"
                                  data={[
                                    { id: "laki-laki", name: "Laki-Laki" },
                                    { id: "perempuan", name: "Perempuan" },
                                  ]}
                                  fieldSetValue="id"
                                  fieldName="name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          name="alamat_pic"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>Alamat</RequiredLabel>
                              <FormControl className="h-10">
                                <Textarea
                                  placeholder="Masukkan alamat lengkap"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <CustomSelectArea
                        form={form}
                        required
                        provinsiField="provinsi_pic"
                        kabupatenField="kabupaten_pic"
                        kecamatanField="kecamatan_pic"
                        kelurahanField="kelurahan_pic"
                      />

                      <div className="space-y-2">
                        <FormField
                          name="nohp_pic"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>
                                No. Telepon
                              </RequiredLabel>
                              <FormControl className="h-10">
                                <Input
                                  {...field}
                                  placeholder="Masukkan nomor telepon"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    field.onChange(numericValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            name="nama_kontak_darurat"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <RequiredLabel required>
                                  Nama Kontak Draurat
                                </RequiredLabel>
                                <FormControl className="h-10">
                                  <Input
                                    placeholder="Nama Kontak Darurat"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField
                            name="nomor_kontak_darurat"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <RequiredLabel required>
                                  No. Kontak Darurat
                                </RequiredLabel>
                                <FormControl className="h-10">
                                  <Input
                                    {...field}
                                    placeholder="Masukkan nomor kontak darurat"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={field.value || ""}
                                    onChange={(e) => {
                                      const numericValue =
                                        e.target.value.replace(/\D/g, "");
                                      field.onChange(numericValue);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            name="email_pic"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <RequiredLabel required>Email</RequiredLabel>
                                <FormControl className="h-10">
                                  <Input
                                    type="email"
                                    placeholder="Masukkan email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <ShinyButton
                          type="button"
                          className="h-10 px-4 lg:mt-7 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold"
                          onClick={kodeAktivasi}
                        >
                          Kirim Kode Verifikasi
                        </ShinyButton>
                      </div>

                      <div className="space-y-2">
                        <FormField
                          name="kode_aktivasi"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <RequiredLabel required>
                                Kode Aktivasi
                              </RequiredLabel>
                              <FormControl className="h-10 flex-1">
                                <Input
                                  placeholder="Masukkan kode aktivasi"
                                  maxLength={6}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>

              {/* Step 3: Unggah KTP */}
              <TabsContent value="step3" className="mt-0">
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 mb-4"
                    >
                      <FileUploadField
                        name="foto_ktp"
                        control={form.control}
                        label="Unggah Dokumen Profil Kelompok"
                        description="(Format: JPG, PNG, GIF, Max 5 MB)"
                        mode="image"
                        valueFile={image}
                        onFileChange={(files) => {
                          if (files?.[0]) {
                            const f = files[0];
                            setImage({
                              name: f.name,
                              url: URL.createObjectURL(f),
                              type: f.type,
                            });
                          } else {
                            setImage(null);
                          }
                        }}
                      />
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>
            </Tabs>

            {activeTab === "step1" && (
              <div className="text-center text-sm">
                <span className="text-gray-600">Sudah punya akun? </span>
                <a
                  href="/auth/login"
                  className="text-green-600 hover:underline font-medium"
                >
                  Login
                </a>
              </div>
            )}
            {activeTab === "step2" && (
              <div className="flex gap-4 mt-4 px-8">
                <Button
                  variant="outline"
                  className="w-1/2 bg-transparent h-10"
                  onClick={() => goBack("step1")}
                >
                  Kembali
                </Button>
                <InteractiveHoverButton
                  className="bg-green-600 hover:bg-green-700 text-white rounded-md h-10 w-1/2 flex items-center justify-center font-medium"
                  onClick={() => handleTabChange("step3")}
                >
                  Berikutnya
                </InteractiveHoverButton>
              </div>
            )}
            {activeTab === "step3" && (
              <div className="flex gap-4 mt-4 px-8">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent h-10 w-1/2"
                  onClick={() => goBack("step2")}
                >
                  Kembali
                </Button>
                <ShinyButton className="h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg text-2xl font-extrabold items-center justify-center flex w-1/2">
                  {register?.isPending ? (
                    <div className="flex items-center justify-center">
                      <Spinner className="text-white" size={20} />
                    </div>
                  ) : (
                    "Daftar Sekarang"
                  )}
                </ShinyButton>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
