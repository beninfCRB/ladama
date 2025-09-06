import { type registerFormType } from "@/schemas/auth.schema";
import {
  useKecamatan,
  useKelurahan,
  useKota,
  useProvinsi,
  type AreaStoreTypes,
} from "@/stores/area.store";
import { useEffect, useRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomSelect from "./CustomSelect";

interface customSelectArea {
  form: registerFormType;
}

function CustomSelectArea({ form }: customSelectArea) {
  const { watch, resetField } = form;
  const provinsiId = watch("provinsi_kelompok_masyarakat_id");
  const kotaId = watch("kabupaten_kelompok_masyarakat_id");
  const kecamatanId = watch("kecamatan_kelompok_masyarakat_id");
  const prevProvinsiId = usePrevious(provinsiId);
  const prevKotaId = usePrevious(kotaId);
  const prevKecamatanId = usePrevious(kecamatanId);

  const { query: provinsi } = useProvinsi();
  const { query: kota } = useKota(provinsiId);
  const { query: kecamatan } = useKecamatan(kotaId);
  const { query: kelurahan } = useKelurahan(kecamatanId);

  function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    if (provinsiId && provinsiId !== prevProvinsiId) {
      resetField("kabupaten_kelompok_masyarakat_id");
      resetField("kecamatan_kelompok_masyarakat_id");
      resetField("kelurahan_kelompok_masyarakat_id");
    }
  }, [provinsiId, prevProvinsiId]);

  useEffect(() => {
    if (kotaId && kotaId !== prevKotaId) {
      resetField("kecamatan_kelompok_masyarakat_id");
      resetField("kelurahan_kelompok_masyarakat_id");
    }
  }, [kotaId, prevKotaId]);

  useEffect(() => {
    if (kecamatanId && kecamatanId !== prevKecamatanId) {
      resetField("kelurahan_kelompok_masyarakat_id");
    }
  }, [kecamatanId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="provinsi_kelompok_masyarakat_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Provinsi <span className="text-red-500">*</span>
                </FormLabel>
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
            name="kabupaten_kelompok_masyarakat_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kabupaten/Kota <span className="text-red-500">*</span>
                </FormLabel>
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
            name="kecamatan_kelompok_masyarakat_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kecamatan <span className="text-red-500">*</span>
                </FormLabel>
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
            name="kelurahan_kelompok_masyarakat_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kelurahan <span className="text-red-500">*</span>
                </FormLabel>
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
