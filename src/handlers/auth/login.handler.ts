import { RoleUser } from "@/lib/roleUser";
import { useTokenStore, useUserStore } from "@/stores/user.store";
import type { ResponseType } from "@/types/reponse";
import type { UserType } from "@/types/user";

async function handleLogin(res?: ResponseType<UserType>) {
  if (!res?.data) return;

  setStorage(res);

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

async function handleLogout() {
  removeStorage();
  window.location.replace("/auth/login");
}

function setStorage(res?: ResponseType<UserType>) {
  useTokenStore.getState().setToken(res?.data?.token || null);
  useUserStore.getState().setUser(res?.data || null);
}

function removeStorage() {
  useTokenStore.getState().clearToken();
  useUserStore.getState().clearUser();
}

export { handleLogin, handleLogout, removeStorage, setStorage };
