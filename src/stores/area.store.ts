import { createGlobalStore } from "@/lib/globalStore";

export interface AreaStoreTypes {
  id?: number;
  code?: string;
  name?: string;
  meta?: string;
}

export const useProvinsi = createGlobalStore<Array<AreaStoreTypes>>(
  "provinsi",
  undefined,
  ["read"]
);

export interface KotaStoreTypes extends AreaStoreTypes {
  kota: Array<AreaStoreTypes>;
}

export function useKota(id?: string) {
  return createGlobalStore<KotaStoreTypes>(`provinsi`, undefined, ["read"])({
    id: id,
  });
}

export interface KecamatanStoreTypes extends AreaStoreTypes {
  kecamatan: Array<AreaStoreTypes>;
}

export function useKecamatan(id?: string) {
  return createGlobalStore<KecamatanStoreTypes>(`kota`, undefined, ["read"])({
    id: id,
  });
}

export interface KelurahanStoreTypes extends AreaStoreTypes {
  kelurahan: Array<AreaStoreTypes>;
}

export function useKelurahan(id?: string) {
  return createGlobalStore<KelurahanStoreTypes>(`kecamatan`, undefined, [
    "read",
  ])({ id: id });
}
