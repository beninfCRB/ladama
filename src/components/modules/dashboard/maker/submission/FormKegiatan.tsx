import CustomTablist from "@/components/custom-ui/CustomTablist";
import RequiredLabel from "@/components/custom-ui/RequiredLabel";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import type { submissionFormReturnType } from "@/schemas/submission.schema";
import type { PaketKegaiatanTypes } from "@/stores/paketKegiatan.store";
import { Check, CheckCheck, Megaphone } from "lucide-react";

interface FormKegiatanProps {
  form: submissionFormReturnType;
  setActiveTab: (value: string) => void;
  paketKegiatan?: Array<PaketKegaiatanTypes>;
}

function FormKegiatan({
  form,
  setActiveTab,
  paketKegiatan,
}: FormKegiatanProps) {
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

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-shadow-white mb-2">
          PILIH KEGIATAN
        </h3>
        <p className="text-sm text-shadow-white">
          Pilih kegiatan yang anda ingin ajukan
        </p>
      </div>
      <CustomTablist />

      <FormField
        control={form.control}
        name="paket_kegiatan"
        render={({ field }) => (
          <div className="space-y-4 md:p-0 lg:p-8">
            {paketKegiatan && paketKegiatan?.length > 0 ? (
              paketKegiatan?.map((activity) => (
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
                    onClick={() => handleSelect(activity.id, field.onChange)}
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
                      <CheckCheck size={30} className="text-[#17a449]" />
                    ) : (
                      <Check size={30} className="text-muted-foreground" />
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
                                  {activity?.paket_kegiatan?.map((option) => (
                                    <SelectItem
                                      key={option.id}
                                      value={option.id}
                                    >
                                      {option.jumlah_peserta}
                                    </SelectItem>
                                  ))}
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
                          handleSelect(activity.id, field.onChange, "paket")
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
    </>
  );
}

export default FormKegiatan;
