import { HyperText } from "@/components/magicui/hyper-text";
import ActivityHistory from "@/components/modules/dashboard/maker/ActivityHistory";
import CreateSubmissionSection from "@/components/modules/dashboard/maker/CreateSubmissionSection";
import DraftSubmissionSection from "@/components/modules/dashboard/maker/DraftSubmissionSection";
import ProgressSubmissionSection from "@/components/modules/dashboard/maker/ProgressSubmissionSection";
import HeaderGroup from "@/components/modules/HeaderGroup";
import MobileHeader from "@/components/modules/MobileHeader";
import SidebarNavigation from "@/components/modules/SidebarNavigation";

function DashboardPage() {
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
              <HyperText className="font-semibold text-gray-800 text-md">
                KELOMPOK PENANAMAN MANGROVE
              </HyperText>
            </div>
            <p className="text-sm text-gray-500">Selasa, 02 Sep 2025, 20.03</p>
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
