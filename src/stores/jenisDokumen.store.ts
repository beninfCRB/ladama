import { createGlobalStore } from "@/lib/globalStore";

export interface jenisDokumenType {
  id: string;
  pendidikan: string;
}

export const useJenisDokumen = createGlobalStore<
  Array<jenisDokumenType>,
  "getJenisDokumen"
>("getJenisDokumen", ["read"]);
