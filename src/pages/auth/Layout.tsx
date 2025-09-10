import HeaderGroup from "@/components/modules/dashboard/HeaderGroup";
import MobileHeader from "@/components/modules/dashboard/MobileHeader";
import SidebarNavigation from "@/components/modules/dashboard/SidebarNavigation";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <HeaderGroup />
      </div>
      <MobileHeader />

      <div className="flex">
        <SidebarNavigation />

        <Outlet />
      </div>
    </div>
  );
}
