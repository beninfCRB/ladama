import { createGlobalStore } from "@/lib/globalStore";

export interface StudyType {
  id: string;
  pendidikan: string;
}

export const useStudy = createGlobalStore<Array<StudyType>>(
  "pendidikan",
  function () {},
  ["read"]
);
