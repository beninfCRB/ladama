import {
  useKecamatan,
  useKelurahan,
  useKota,
  useProvinsi,
  type AreaStoreTypes,
} from "@/stores/area.store";
import { useEffect, useRef } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import CustomSelect from "./CustomSelect";
import RequiredLabel from "./RequiredLabel";

interface CustomSelectAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  required: boolean;
  provinsiField: Path<T>;
  kabupatenField: Path<T>;
  kecamatanField: Path<T>;
  kelurahanField: Path<T>;
}

function CustomSelectArea<T extends FieldValues>({
  form,
  required,
  provinsiField,
  kabupatenField,
  kecamatanField,
  kelurahanField,
}: CustomSelectAreaProps<T>) {
  const { watch, resetField } = form;
  const provinsiId = watch(provinsiField);
  const kotaId = watch(kabupatenField);
  const kecamatanId = watch(kecamatanField);

  const prevProvinsiId = usePrevious(provinsiId);
  const prevKotaId = usePrevious(kotaId);
  const prevKecamatanId = usePrevious(kecamatanId);

  const { query: provinsi } = useProvinsi();
  const { query: kota } = useKota(provinsiId);
  const { query: kecamatan } = useKecamatan(kotaId);
  const { query: kelurahan } = useKelurahan(kecamatanId);

  function usePrevious<U>(value: U): U | undefined {
    const ref = useRef<U | undefined>(undefined);
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    if (provinsiId && provinsiId !== prevProvinsiId) {
      resetField(kabupatenField);
      resetField(kecamatanField);
      resetField(kelurahanField);
    }
  }, [
    provinsiId,
    prevProvinsiId,
    resetField,
    kabupatenField,
    kecamatanField,
    kelurahanField,
  ]);

  useEffect(() => {
    if (kotaId && kotaId !== prevKotaId) {
      resetField(kecamatanField);
      resetField(kelurahanField);
    }
  }, [kotaId, prevKotaId, resetField, kecamatanField, kelurahanField]);

  useEffect(() => {
    if (kecamatanId && kecamatanId !== prevKecamatanId) {
      resetField(kelurahanField);
    }
  }, [kecamatanId, prevKecamatanId, resetField, kelurahanField]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={provinsiField}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>Provinsi</RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih provinsi"
                    data={provinsi.data?.data}
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
            name={kabupatenField}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>
                  Kabupaten/Kota
                </RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih kabupaten/kota"
                    data={kota.data?.data?.kota}
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
            name={kecamatanField}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>Kecamatan</RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih kecamatan"
                    data={kecamatan.data?.data?.kecamatan}
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
            name={kelurahanField}
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={required}>Kelurahan</RequiredLabel>
                <FormControl>
                  <CustomSelect<AreaStoreTypes>
                    placeholder="Pilih kelurahan"
                    data={kelurahan.data?.data?.kelurahan}
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
