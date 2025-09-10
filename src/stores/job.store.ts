import { createGlobalStore } from "@/lib/globalStore";

export interface JobType {
  id: string;
  jenis_pekerjaan: string;
}

export const useJob = createGlobalStore<Array<JobType>, "jenis-pekerjaan">(
  "jenis-pekerjaan",
  ["read"]
);
