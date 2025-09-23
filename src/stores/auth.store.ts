import { handlerLogin } from "@/handlers/auth/login.handler";
import { createGlobalStore } from "@/lib/globalStore";
import type { loginFormType } from "@/schemas/auth.schema";
import type { UserType } from "@/types/user";
import { create } from "zustand";

interface LoginTypes extends UserType, loginFormType {}

export const useLogin = createGlobalStore<LoginTypes, "login">(
  "login",
  ["create"],
  handlerLogin
);

export const useRegister = createGlobalStore<null, "registerdua", FormData>(
  "registerdua",
  ["create"]
);
export const useForgetPassword = createGlobalStore<
  null,
  "changePassword",
  { email: string }
>("changePassword", ["create"]);

interface KodeVerifikasiType {
  email_pic: string;
}

export const useKodeVerifikasi = createGlobalStore<
  KodeVerifikasiType,
  "getKodeAktivasi"
>("getKodeAktivasi", ["create"]);

interface LogoutTypes {
  dialog: boolean;
  setDialog: (dialog: boolean) => void;
}

export const useLogout = create<LogoutTypes>((set) => ({
  dialog: false,
  setDialog: (dialog: boolean) => set({ dialog }),
}));
