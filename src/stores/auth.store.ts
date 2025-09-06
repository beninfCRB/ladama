import { handleLogin } from "@/handlers/auth/login.handler";
import { createGlobalStore } from "@/lib/globalStore";
import type { UserType } from "@/types/user";

interface loginTypes extends UserType {
  email: string;
  password: string;
}

export const useLogin = createGlobalStore<loginTypes>("login", handleLogin, [
  "create",
]);
