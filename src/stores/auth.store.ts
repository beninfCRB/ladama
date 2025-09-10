import { handleLogin } from "@/handlers/auth/login.handler";
import { createGlobalStore } from "@/lib/globalStore";
import type { loginFormType } from "@/schemas/auth.schema";
import type { UserType } from "@/types/user";

interface LoginTypes extends UserType, loginFormType {}

export const useLogin = createGlobalStore<LoginTypes, "login">(
  "login",
  ["create"],
  handleLogin
);

export const useRegister = createGlobalStore<FormData, "registerdua">(
  "registerdua",
  ["create"]
);

interface KodeVerifikasiType {
  email_pic: string;
}

export const useKodeVerifikasi = createGlobalStore<
  KodeVerifikasiType,
  "getKodeAktivasi"
>("getKodeAktivasi", ["create"]);
