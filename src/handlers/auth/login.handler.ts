import { RoleUser } from "@/lib/roleUser";
import { useTokenStore, useUserStore } from "@/stores/user.store";
import type { ResponseType } from "@/types/reponse";
import type { UserType } from "@/types/user";

async function handlerLogin(res?: ResponseType<UserType>) {
  if (!res?.data) return;

  useTokenStore.getState().setToken(res?.data?.token || null);
  useUserStore.getState().setUser(res?.data || null);

  if (res.data.role_user === RoleUser.maker) {
    window.location.replace("/maker/dashboard");
  } else if (res.data.role_user === RoleUser.verifikator) {
    window.location.replace("/verifikator/dashboard");
  } else if (res.data.role_user === RoleUser.approver) {
    window.location.replace("/approver/dashboard");
  } else {
    window.location.replace("/pmu-bpdlh/dashboard");
  }
}

async function handlerLogout() {
  useTokenStore.getState().clearToken();
  useUserStore.getState().clearUser();
  window.location.replace("/auth/login");
}

export { handlerLogin, handlerLogout };
