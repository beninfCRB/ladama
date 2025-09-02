import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function ProgressSubmissionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-600 font-medium">
          PROGRESS KEGIATAN
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Activity Badge */}
        <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm font-medium">
          Pelatihan 50 Orang
        </Badge>

        {/* Progress Card */}
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

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={10} className="h-2" />
          </div>

          {/* Total Amount */}
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
