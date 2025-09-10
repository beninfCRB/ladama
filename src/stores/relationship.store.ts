import { createGlobalStore } from "@/lib/globalStore";

export interface RelationshipType {
  id: string;
  status_pernikahan: string;
}

export const useRelationship = createGlobalStore<
  Array<RelationshipType>,
  "status-pernikahan"
>("status-pernikahan", ["read"]);
