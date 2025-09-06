import { TypingAnimation } from "@/components/magicui/typing-animation";
import ActivityHistory from "@/components/modules/dashboard/maker/ActivityHistory";
import CreateSubmissionSection from "@/components/modules/dashboard/maker/CreateSubmissionSection";
import DraftSubmissionSection from "@/components/modules/dashboard/maker/DraftSubmissionSection";
import ProgressSubmissionSection from "@/components/modules/dashboard/maker/ProgressSubmissionSection";
import HeaderGroup from "@/components/modules/HeaderGroup";
import MobileHeader from "@/components/modules/MobileHeader";
import SidebarNavigation from "@/components/modules/SidebarNavigation";
import moment from "moment";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => setDate(moment()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <HeaderGroup />
      </div>
      <MobileHeader />

      <div className="flex">
        <SidebarNavigation />

        <main className="flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="hidden lg:block space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">🏠</span>
              <span className="text-gray-600">Halo,</span>
              <TypingAnimation className="font-semibold text-[#10a249] text-md">
                KELOMPOK PENANAMAN MANGROVE
              </TypingAnimation>
            </div>
            <p className="text-sm font-medium text-yellow-500">
              {date.format("DD MMMM YYYY, HH:mm:ss")}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-0">
            <div className="lg:hidden">
              <ProgressSubmissionSection />
            </div>

            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
              <ProgressSubmissionSection />
              <CreateSubmissionSection />
              <DraftSubmissionSection />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
              <div className="scale-90 sm:scale-95">
                <CreateSubmissionSection />
              </div>
              <div className="scale-90 sm:scale-95">
                <DraftSubmissionSection />
              </div>
            </div>
          </div>

          <div className="w-full">
            <ActivityHistory />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
