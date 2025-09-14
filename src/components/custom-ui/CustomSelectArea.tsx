import {
  useKecamatan,
  useKelurahan,
  useKota,
  useProvinsi,
  type AreaStoreTypes,
} from "@/stores/area.store";
import { useEffect } from "react";
import {
  type FieldValues,
  type UseFormReturn,
  type Path,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import CustomSelect from "./CustomSelect";
import RequiredLabel from "./RequiredLabel";

interface CustomSelectAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  required: boolean;
  provinsiField: Extract<keyof T, string>;
  kabupatenField: Extract<keyof T, string>;
  kecamatanField: Extract<keyof T, string>;
  kelurahanField: Extract<keyof T, string>;
}

// 🔹 helper konversi aman
function asPath<T extends FieldValues>(key: Extract<keyof T, string>): Path<T> {
  return key as unknown as Path<T>;
}

function CustomSelectArea<T extends FieldValues>({
  form,
  required,
  provinsiField,
  kabupatenField,
  kecamatanField,
  kelurahanField,
}: CustomSelectAreaProps<T>) {
  const { resetField, watch } = form;

  const provinsiId = watch(asPath<T>(provinsiField));
  const kotaId = watch(asPath<T>(kabupatenField));
  const kecamatanId = watch(asPath<T>(kecamatanField));

  const { query: provinsi } = useProvinsi();
  const { query: kota } = useKota(provinsiId);
  const { query: kecamatan } = useKecamatan(kotaId);
  const { query: kelurahan } = useKelurahan(kecamatanId);

  // reset otomatis saat field berubah
  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name === asPath<T>(provinsiField)) {
        resetField(asPath<T>(kabupatenField));
        resetField(asPath<T>(kecamatanField));
        resetField(asPath<T>(kelurahanField));
      }
      if (name === asPath<T>(kabupatenField)) {
        resetField(asPath<T>(kecamatanField));
        resetField(asPath<T>(kelurahanField));
      }
      if (name === asPath<T>(kecamatanField)) {
        resetField(asPath<T>(kelurahanField));
      }
    });
    return () => subscription.unsubscribe();
  }, [
    form,
    provinsiField,
    kabupatenField,
    kecamatanField,
    kelurahanField,
    resetField,
  ]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={asPath<T>(provinsiField)}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>Provinsi</RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih provinsi"
                    data={provinsi?.data?.data}
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
            control={form.control}
            name={asPath<T>(kabupatenField)}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>
                  Kabupaten/Kota
                </RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih kabupaten/kota"
                    data={kota?.data?.data?.kota}
                    fieldSetValue="id"
                    fieldName="name"
                    disabled={!provinsiId}
                    {...field}
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
            control={form.control}
            name={asPath<T>(kecamatanField)}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>Kecamatan</RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih kecamatan"
                    data={kecamatan?.data?.data?.kecamatan}
                    fieldSetValue="id"
                    fieldName="name"
                    disabled={!kotaId}
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
            name={asPath<T>(kelurahanField)}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>Kelurahan</RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih kelurahan"
                    data={kelurahan?.data?.data?.kelurahan}
                    fieldSetValue="id"
                    fieldName="name"
                    disabled={!kecamatanId}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default CustomSelectArea;
