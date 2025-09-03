import { RoleUser } from "@/lib/roleUser";
import type { ResponseType } from "@/types/reponse";
import type { UserType } from "@/types/user";

async function handleLogin(res?: ResponseType<UserType>) {
  setStorage(res);
  if (res?.data?.role_user === RoleUser.maker) {
    window.location.replace("/maker/dashboard");
  } else if (res?.data?.role_user === RoleUser.verifikator) {
    window.location.replace("/verifikator/dashboard");
  } else if (res?.data?.role_user === RoleUser.approver) {
    window.location.replace("/approver/dashboard");
  } else {
    window.location.replace("/pmu-bpdlh/dashboard");
  }
}
async function handleLogout() {
  removeStorage();
  window.location.replace("/login");
}

function setStorage(res?: ResponseType<UserType>) {
  localStorage.setItem("token", JSON.stringify(res?.data?.token));
  localStorage.setItem("user_data", JSON.stringify(res?.data));
}

function removeStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_data");
}

export { handleLogin, handleLogout, setStorage, removeStorage };
