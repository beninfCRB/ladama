import { handleLogin } from "@/handlers/auth/login.handler";
import { createGlobalStore } from "@/lib/globalStore";

export const useLogin = createGlobalStore("login", handleLogin, ["create"]);
