import DialogLogout from "@/components/modules/dashboard/DialogLogout";
import HeaderGroup from "@/components/modules/dashboard/HeaderGroup";
import MobileHeader from "@/components/modules/dashboard/MobileHeader";
import SidebarNavigation from "@/components/modules/dashboard/SidebarNavigation";
import { useDeadlineStore } from "@/stores/countDown.store";
import { useRangeOpening } from "@/stores/rangeOpening.store";
import moment from "moment";
import { useEffect } from "react";
import { Outlet } from "react-router";

export function Layout() {
  const rangeOpening = useRangeOpening().useGlobalStore(
    (s) => s["getRangeOpeningData"]
  );

  const { isBeforeDeadline, setIsBeforeDeadline } = useDeadlineStore();

  const deadline = `${rangeOpening?.data?.tanggal_akhir} ${rangeOpening?.data?.jam_akhir}`;

  useEffect(() => {
    const checkDeadline = () => {
      if (moment().isBefore(moment(deadline, "YYYY-MM-DD HH:mm:ss"))) {
        setIsBeforeDeadline(true);
      } else {
        setIsBeforeDeadline(false);
      }
    };

    checkDeadline();
    const interval = setInterval(checkDeadline, 60_000);
    return () => clearInterval(interval);
  }, [deadline, setIsBeforeDeadline]);

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
      <div className="flex flex-1 overflow-hidden pt-16 lg:pt-0">
        {/* Sidebar */}
        <div className="hidden lg:block h-full">
          <SidebarNavigation />
        </div>

        {/* Outlet */}
        <div className="flex-1 h-full overflow-y-auto">
          <DialogLogout />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
