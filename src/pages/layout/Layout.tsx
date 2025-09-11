import HeaderGroup from "@/components/modules/dashboard/HeaderGroup";
import MobileHeader from "@/components/modules/dashboard/MobileHeader";
import SidebarNavigation from "@/components/modules/dashboard/SidebarNavigation";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="hidden lg:block">
        <HeaderGroup />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:block h-full">
          <SidebarNavigation />
        </div>

        {/* Outlet */}
        <div className="flex-1 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
