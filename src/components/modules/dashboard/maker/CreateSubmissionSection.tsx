import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalStore } from "@/stores/allModal";
import { useDeadlineStore } from "@/stores/countDown.store";
import { type DraftPengajuanKegiatanType } from "@/stores/draftPengajuanKegiatan.store";
import { useProgressKegiatan } from "@/stores/progressKegiatan.store";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

interface CreateSubmissionSectionProps {
  draftPengajuanKegiatan?: DraftPengajuanKegiatanType;
}

function CreateSubmissionSection({
  draftPengajuanKegiatan,
}: CreateSubmissionSectionProps) {
  const { openModal } = useModalStore();
  const { isBeforeDeadline } = useDeadlineStore();
  const progress = useProgressKegiatan().useGlobalStore(
    (s) => s["getDataProsesKegiatanData"]
  );

  const handleCreateSubmission = () => {
    if (
      isBeforeDeadline &&
      draftPengajuanKegiatan?.status !== "draft" &&
      progress?.data?.length === 0
    ) {
      openModal("CreateSubmission");
    } else if (
      isBeforeDeadline &&
      draftPengajuanKegiatan?.status === "draft" &&
      progress?.data?.length === 0
    ) {
      toast.error(
        "Pengajuan kegiatan anda belum lengkap, klik draft untuk melengkapi",
        {
          position: "top-center",
        }
      );
    } else if (
      isBeforeDeadline &&
      draftPengajuanKegiatan?.status !== "draft" &&
      progress?.data &&
      progress?.data?.length > 0
    ) {
      toast.error(
        "Pengajuan kegiatan anda belum selesai, klik lihat detail untuk melengkapi",
        {
          position: "top-center",
        }
      );
    } else {
      toast.error("Deadline pengajuan sudah berakhir", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="h-full relative rounded-xl overflow-hidden shadow-lg">
      <Card className="h-full relative rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-600 font-medium text-xl">
            BUAT PENGAJUAN
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center md:py-0 lg:py-8 space-y-4 flex-1 hover:scale-110 transition-transform cursor-pointer">
          <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 cursor-pointer"
              onClick={handleCreateSubmission}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            className="text-green-600 hover:text-green-700 p-0 h-auto"
          >
            Buat Pengajuan
          </Button>
        </CardContent>
      </Card>

      <BorderBeam
        borderWidth={2}
        duration={8}
        size={300}
        delay={4}
        reverse
        className="from-transparent via-green-400 to-transparent"
      />
      <BorderBeam
        borderWidth={2}
        duration={8}
        size={300}
        reverse
        className="from-transparent via-green-400 to-transparent"
      />
    </div>
  );
}

export default CreateSubmissionSection;
