import { handleLogin } from "@/handlers/auth/login.handler";
import { createGlobalStore } from "@/lib/globalStore";

export const useLogin = createGlobalStore<any>("login", handleLogin, [
  "create",
]);
