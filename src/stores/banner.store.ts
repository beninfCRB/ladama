import { createGlobalStore } from "@/lib/globalStore";

export const useBanner = createGlobalStore("banner-informasi", function () {}, [
  "read",
]);
