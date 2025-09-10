import { createGlobalStore } from "@/lib/globalStore";

export interface ReligionType {
  id: string;
  agama: string;
}

export const useReligion = createGlobalStore<Array<ReligionType>, "agama">(
  "agama",
  ["read"]
);
