import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShinyButton } from "@/components/magicui/shiny-button";

function ProgressSubmissionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-600 font-medium">
          PROGRESS KEGIATAN
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ShinyButton className="h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium items-center justify-center flex rounded-br-full rounded-tl-full">
          Pelatihan 50 Orang
        </ShinyButton>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Dalam Proses Verifikasi</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                #07113-2508-00111
              </p>
              <p className="text-sm font-bold text-gray-800">10 %</p>
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={10} className="h-2" />
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-600">Total dana diterima</span>
            <span className="font-semibold text-gray-800">Rp 0,00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProgressSubmissionSection;
