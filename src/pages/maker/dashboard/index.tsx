import BreadCrumb from "@/components/custom-ui/BreadCrumb";
import Coutndown from "@/components/custom-ui/Coutndown";
import ActivityHistory from "@/components/modules/dashboard/maker/ActivityHistory";
import CreateSubmissionSection from "@/components/modules/dashboard/maker/CreateSubmissionSection";
import DraftSubmissionSection from "@/components/modules/dashboard/maker/DraftSubmissionSection";
import ProgressSubmissionSection from "@/components/modules/dashboard/maker/ProgressSubmissionSection";
import { CreateSubmissionModal } from "@/components/modules/dashboard/maker/submission/CreateSubmissionModal";
import { useModalStore } from "@/stores/allModal";
import { useDeadlineStore } from "@/stores/countDown.store";
import { useDraftPengajuanKegiatan } from "@/stores/draftPengajuanKegiatan.store";
import { useState } from "react";

function DashboardMakerPage() {
  const { isBeforeDeadline } = useDeadlineStore();
  const { openModal } = useModalStore();
  const [isDraft, setDraft] = useState<boolean>(false);
  const draftPengajuanKegiatan = useDraftPengajuanKegiatan().useGlobalStore(
    (s) => s["getDraftPengajuanData"]
  );

  const handleOpenDraft = () => {
    setDraft(true);
    openModal("CreateSubmission");
  };

  return (
    <main className="flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 space-y-3 sm:space-y-4 lg:space-y-6">
      <BreadCrumb />

      <CreateSubmissionModal
        isDraft={isDraft}
        draftPengajuanKegiatan={draftPengajuanKegiatan?.data}
      />

      <div className="space-y-3 sm:space-y-4 lg:space-y-0">
        <div className="lg:hidden space-y-4">
          {isBeforeDeadline && <Coutndown />}
          <ProgressSubmissionSection />
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          <div className="col-span-2">
            <ProgressSubmissionSection />
          </div>
          <CreateSubmissionSection
            draftPengajuanKegiatan={draftPengajuanKegiatan?.data}
          />
          <DraftSubmissionSection
            openDraft={handleOpenDraft}
            draftPengajuanKegiatan={draftPengajuanKegiatan?.data}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
          <div className="scale-90 sm:scale-95">
            <CreateSubmissionSection
              draftPengajuanKegiatan={draftPengajuanKegiatan?.data}
            />
          </div>
          <div className="scale-90 sm:scale-95">
            <DraftSubmissionSection
              openDraft={handleOpenDraft}
              draftPengajuanKegiatan={draftPengajuanKegiatan?.data}
            />
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
