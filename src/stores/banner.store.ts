import { createGlobalStore } from "@/lib/globalStore";

export const useBanner = createGlobalStore<any>("banner-informasi", undefined, [
  "read",
]);
