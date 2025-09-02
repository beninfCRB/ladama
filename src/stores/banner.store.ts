import { createGlobalStore } from "@/lib/globalStore";

export const useBanner: any = createGlobalStore<any>(
  "banner-informasi",
  function () {},
  ["read"]
);
