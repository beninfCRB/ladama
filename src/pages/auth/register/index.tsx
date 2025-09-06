import CustomSelect from "@/components/custom-ui/CustomSelect";
import CustomSelectArea from "@/components/custom-ui/CustomSelectArea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { registerSchema } from "@/schemas/auth.schema";
import {
  useJenisKelompok,
  type JenisKelompokStoreTypes,
} from "@/stores/register.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronRight, CreditCard, FileText, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import logo from "@/assets/logo.svg";
import { Input } from "@/components/ui/input";

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
  const [activeTab, setActiveTab] = useState("step1");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      jenis_kelompok_masyarakat_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {}

  // const handleFileChange =
  //   (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0] || null;
  //     form.setValue((prev) => ({ ...prev, [field]: file }));
  //   };

  const handleTabChange = (value: string) => {
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                  onClick={() => handleTabChange(`step${step.id}`)}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={`text-xs font-medium cursor-pointer ${
                      isActive ? "text-green-600" : "text-gray-500"
                    }`}
                    onClick={() => handleTabChange(`step${step.id}`)}
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
      <div className="w-full lg:w-1/3 bg-white p-4 lg:p-6 xl:p-8 border-r border-gray-200">
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
                  LANGKAH{" "}
                  {activeTab === "step1"
                    ? "1"
                    : activeTab === "step2"
                    ? "2"
                    : "3"}{" "}
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
                              <FormLabel>
                                Jenis Kelompok
                                <span className="text-red-500">*</span>
                              </FormLabel>
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
                              <FormLabel>
                                Kelompok Masyarakat
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl className="h-10">
                                <Input
                                  placeholder="Kelompok masyarakat"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <CustomSelectArea form={form} />

                      {/* <div className="space-y-2">
                        <Label
                          htmlFor="kelompokMasyarakat"
                          className="text-sm font-medium"
                        >
                          Kelompok masyarakat{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="kelompokMasyarakat"
                          className="w-full"
                          placeholder="Masukkan nama kelompok masyarakat"
                          value={formData.kelompokMasyarakat}
                          onChange={(e) =>
                            handleInputChange(
                              "kelompokMasyarakat",
                              e.target.value
                            )
                          }
                        />
                      </div>


                      <div className="space-y-2">
                        <Label
                          htmlFor="profilFile"
                          className="text-sm font-medium"
                        >
                          Unggah Profil Kelompok{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="text-xs text-gray-500 mb-2">
                          (Tipe file .docx, .doc, .pdf, Maksimal 10 MB)
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="profilFile"
                            className="hidden"
                            accept=".docx,.doc,.pdf"
                            onChange={handleFileChange("profilFile")}
                          />
                          <label
                            htmlFor="profilFile"
                            className="cursor-pointer"
                          >
                            <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              {formData.profilFile
                                ? formData.profilFile.name
                                : "Klik untuk mengunggah file"}
                            </p>
                          </label>
                        </div>
                      </div> */}

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white h-11 lg:h-12"
                        onClick={() => handleTabChange("step2")}
                      >
                        Berikutnya
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </Form>

                  {/* Login Link */}
                  <div className="text-center text-sm">
                    <span className="text-gray-600">Sudah punya akun? </span>
                    <a
                      href="/auth/login"
                      className="text-green-600 hover:underline font-medium"
                    >
                      Login
                    </a>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Step 2: Detail Penanggung Jawab */}
              {/* <TabsContent value="step2" className="mt-0">
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="namaLengkap"
                      className="text-sm font-medium"
                    >
                      Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="namaLengkap"
                      className="w-full"
                      placeholder="Masukkan nama lengkap"
                      value={formData.namaLengkap}
                      onChange={(e) =>
                        handleInputChange("namaLengkap", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nik" className="text-sm font-medium">
                      NIK <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nik"
                      className="w-full"
                      placeholder="Masukkan NIK"
                      value={formData.nik}
                      onChange={(e) => handleInputChange("nik", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="tempatLahir"
                        className="text-sm font-medium"
                      >
                        Tempat Lahir <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tempatLahir"
                        className="w-full"
                        placeholder="Tempat lahir"
                        value={formData.tempatLahir}
                        onChange={(e) =>
                          handleInputChange("tempatLahir", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="tanggalLahir"
                        className="text-sm font-medium"
                      >
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tanggalLahir"
                        type="date"
                        className="w-full"
                        value={formData.tanggalLahir}
                        onChange={(e) =>
                          handleInputChange("tanggalLahir", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="jenisKelamin"
                      className="text-sm font-medium"
                    >
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.jenisKelamin}
                      onValueChange={(value) =>
                        handleInputChange("jenisKelamin", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alamat" className="text-sm font-medium">
                      Alamat <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="alamat"
                      className="w-full"
                      placeholder="Masukkan alamat lengkap"
                      value={formData.alamat}
                      onChange={(e) =>
                        handleInputChange("alamat", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="noTelepon"
                        className="text-sm font-medium"
                      >
                        No. Telepon <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="noTelepon"
                        className="w-full"
                        placeholder="Masukkan nomor telepon"
                        value={formData.noTelepon}
                        onChange={(e) =>
                          handleInputChange("noTelepon", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="w-full"
                        placeholder="Masukkan email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleTabChange("step1")}
                    >
                      Kembali
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleTabChange("step3")}
                    >
                      Berikutnya
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </TabsContent> */}

              {/* Step 3: Unggah KTP */}
              {/* <TabsContent value="step3" className="mt-0">
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Unggah KTP Penanggung Jawab
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Silakan unggah foto atau scan KTP penanggung jawab
                        kelompok/perorangan
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ktpFile" className="text-sm font-medium">
                      File KTP <span className="text-red-500">*</span>
                    </Label>
                    <div className="text-xs text-gray-500 mb-2">
                      (Tipe file .jpg, .jpeg, .png, .pdf, Maksimal 5 MB)
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="ktpFile"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange("ktpFile")}
                      />
                      <label htmlFor="ktpFile" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">
                          {formData.ktpFile
                            ? formData.ktpFile.name
                            : "Klik untuk mengunggah file KTP"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Pastikan foto KTP jelas dan dapat dibaca
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleTabChange("step2")}
                    >
                      Kembali
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Selesai & Daftar
                    </Button>
                  </div>
                </CardContent>
              </TabsContent> */}
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
