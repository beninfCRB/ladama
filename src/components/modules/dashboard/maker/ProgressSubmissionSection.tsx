import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dictionary, ProgressValue } from "@/lib/progress";
import { formatRupiah } from "@/lib/rupiah";
import { useProgressKegiatan } from "@/stores/progressKegiatan.store";

function ProgressSubmissionSection() {
  const progress = useProgressKegiatan().useGlobalStore(
    (s) => s["getDataProsesKegiatanData"]
  );

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <Card className="h-full relative rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-600 font-medium">
            PROGRESS KEGIATAN
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <>
            <ShinyButton className="h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium items-center justify-center flex rounded-br-full rounded-tl-full">
              {`${progress?.data?.at(0)?.jenis_kegiatan} ${
                progress?.data?.at(0)?.jumlah
              }`}
            </ShinyButton>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">
                    {
                      Dictionary[
                        Number(
                          progress?.data?.at(0)?.tahapan_pengajuan
                        ) as keyof typeof Dictionary
                      ]
                    }
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    #{progress?.data?.at(0)?.nomor_pengajuan}
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {
                      ProgressValue[
                        Number(
                          progress ? progress.data?.at(0)?.tahapan_pengajuan : 0
                        ) as keyof typeof ProgressValue
                      ]
                    }{" "}
                    %
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Progress
                  value={
                    ProgressValue[
                      Number(
                        progress ? progress.data?.at(0)?.tahapan_pengajuan : 0
                      ) as keyof typeof ProgressValue
                    ]
                  }
                  className="h-2"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  Total dana diterima
                </span>
                <span className="font-semibold text-gray-800">
                  {formatRupiah(
                    progress ? progress.data?.at(0)?.dana_yang_diajukan : 0
                  )}
                </span>
              </div>
            </div>
          </>
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

export default ProgressSubmissionSection;
