import logo from "@/assets/logo.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

function HeaderGroup() {
  const { setDialog } = useLogout();
  const user = useUserStore.getState().user;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="dark:invert"
            src={logo}
            alt=""
            width={150}
            height={150}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gray-100">
                <span className="text-gray-600">👤</span>
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 hidden sm:inline">
              {user?.nama}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setDialog(true)}>
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderGroup;
