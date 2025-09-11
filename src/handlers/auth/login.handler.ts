import { RoleUser } from "@/lib/roleUser";
import { useUserStore } from "@/stores/user.store";
import type { ResponseType } from "@/types/reponse";
import type { UserType } from "@/types/user";

async function handleLogin(res?: ResponseType<UserType>) {
  if (!res?.data) return;

  useUserStore.getState().setUser(res.data);

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
  useUserStore.getState().clearUser(); // persist otomatis hapus storage
  window.location.replace("/auth/login");
}

function setStorage(res?: ResponseType<UserType>) {
  useUserStore.getState().setUser(res?.data || null);
  localStorage.setItem("token", res?.data?.token as string);
  localStorage.setItem("user_data", JSON.stringify(res?.data));
}

function removeStorage() {
  useUserStore.getState().clearUser();
  localStorage.removeItem("token");
  localStorage.removeItem("user_data");
}

export { handleLogin, handleLogout, setStorage, removeStorage };
