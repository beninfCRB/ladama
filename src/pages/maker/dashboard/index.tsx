import BreadCrumb from "@/components/custom-ui/BreadCrumb";
import ActivityHistory from "@/components/modules/dashboard/maker/ActivityHistory";
import CreateSubmissionSection from "@/components/modules/dashboard/maker/CreateSubmissionSection";
import DraftSubmissionSection from "@/components/modules/dashboard/maker/DraftSubmissionSection";
import ProgressSubmissionSection from "@/components/modules/dashboard/maker/ProgressSubmissionSection";
import { CreateSubmissionModal } from "@/components/modules/dashboard/maker/submission/CreateSubmission";

function DashboardMakerPage() {
  return (
    <main className="flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 space-y-3 sm:space-y-4 lg:space-y-6">
      <BreadCrumb />

      <CreateSubmissionModal />

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
  );
}

export default DashboardMakerPage;
