import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type DraftPengajuanKegiatanType } from "@/stores/draftPengajuanKegiatan.store";
import { SquarePen } from "lucide-react";

interface DraftSubmissionSectionProps {
  draftPengajuanKegiatan?: DraftPengajuanKegiatanType;
  openDraft: () => void;
}

function DraftSubmissionSection({
  draftPengajuanKegiatan,
  openDraft,
}: DraftSubmissionSectionProps) {
  return (
    <div className="h-full relative rounded-xl overflow-hidden shadow-lg">
      <Card className="h-full relative rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-600 font-medium text-xl">
            DRAFT PENGAJUAN
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center md:py-0 lg:py-8 space-y-4 flex-1 hover:scale-110 transition-transform cursor-pointer">
          {draftPengajuanKegiatan?.status === "draft" ? (
            <>
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 cursor-pointer"
                  onClick={openDraft}
                >
                  <SquarePen className="w-6 h-6" />
                </Button>
              </div>
              <Button
                variant="ghost"
                className="text-green-600 hover:text-green-700 p-0 h-auto"
              >
                Selesaikan Pengajuan
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-400">Tidak ada draft pengajuan</p>
            </div>
          )}
        </CardContent>
      </Card>

      <BorderBeam
        borderWidth={2}
        duration={8}
        size={300}
        delay={4}
        reverse
        className="from-transparent via-amber-400 to-transparent"
      />
      <BorderBeam
        borderWidth={2}
        duration={8}
        size={300}
        reverse
        className="from-transparent via-amber-400 to-transparent"
      />
    </div>
  );
}

export default DraftSubmissionSection;
