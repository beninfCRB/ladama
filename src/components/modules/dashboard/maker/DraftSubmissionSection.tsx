import { BorderBeam } from "@/components/magicui/border-beam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DraftSubmissionSection() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <Card className="h-full relative rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-600 font-medium">
            DRAFT PENGAJUAN
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center md:py-0 lg:py-8 space-y-4 flex-1">
          <div className="text-center">
            <p className="text-sm text-gray-500">Tidak ada draft pengajuan</p>
          </div>
        </CardContent>
      </Card>

      <BorderBeam
        borderWidth={2}
        duration={8}
        size={300}
        delay={4}
        reverse
        className="from-transparent via-yellow-200 to-transparent"
      />
      <BorderBeam
        borderWidth={2}
        duration={8}
        size={300}
        reverse
        className="from-transparent via-yellow-200 to-transparent"
      />
    </div>
  );
}

export default DraftSubmissionSection;
