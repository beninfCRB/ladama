import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "@/assets/logo.svg";

function HeaderGroup() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="dark:invert"
            src={logo}
            alt=""
            width={150}
            height={150}
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gray-100">
                <span className="text-gray-600">👤</span>
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 hidden sm:inline">
              KELOMPOK PENANAMAN MANGROVE
            </span>
          </div>
          <Button variant="outline" size="sm">
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderGroup;
