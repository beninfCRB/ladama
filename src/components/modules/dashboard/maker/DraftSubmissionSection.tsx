import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DraftSubmissionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-600 font-medium">
          DRAFT PENGAJUAN
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Tidak ada draft pengajuan</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default DraftSubmissionSection;
