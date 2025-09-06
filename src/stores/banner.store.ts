import { createGlobalStore } from "@/lib/globalStore";

interface BannerTypes {
  deskripsi?: string;
}

export const useBanner = createGlobalStore<BannerTypes>(
  "banner-informasi",
  function () {},
  ["read"]
);
