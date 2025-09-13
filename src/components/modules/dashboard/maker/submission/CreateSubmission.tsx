"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/stores/allModal";
import Papa from "@/assets/submission/papa.png";
import Pana from "@/assets/submission/pana.png";
import Amico from "@/assets/submission/amico.png";
import { useTematikKegiatan } from "@/stores/tematikKegiatan.store";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export function CreateSubmissionModal() {
  const tematik = useTematikKegiatan().useGlobalStore(
    (s) => s["tematikKegiatanData"]
  );

  const themes = [
    {
      id: "folu-school",
      title: "FOLU GOES TO SCHOOL",
      description:
        "Kegiatan Folu Goes to School diperuntukkan sekolah setara SMA dan dibawahnya bertujuan untuk peningkatan pengetahuan, kesadaran, dan partisipasi terhadap mitigasi/adaptasi perubahan iklim. TEST",
      image: "/school-education-illustration.jpg",
    },
    {
      id: "folu-terra",
      title: "FOLU TERRA",
      description:
        "Folu Terra (Kesejahteraan Rakyat) dapat diikuti Kelompok pemuda dan komunitas pecinta lingkungan. Kegiatan yang mencakup pengelolaan sampah, energi baru dan terbarukan, dan pengelolaan DAS",
      image: "/environmental-conservation-illustration.jpg",
    },
    {
      id: "folu-biodiversity",
      title: "FOLU BIODIVERSITY",
      description:
        "Kegiatan ini menyasar kelompok pemuda dan kelompok masyarakat pecinta lingkungan. Kegiatan ini mencakup kegiatan yang terkait jasa lingkungan/ekowisata, kesehatan, penghijauan/penanaman kembali, energi baru dan terbarukan, dan pengelolaan sampah.",
      image: "/biodiversity-animals-nature-illustration.jpg",
    },
  ];

  const imgUrls = [Pana, Amico, Papa];
  const { modals, closeModal } = useModalStore();

  return (
    <Dialog
      open={modals["CreateSubmission"]}
      onOpenChange={(open) => !open && closeModal("CreateSubmission")}
    >
      <DialogContent className="w-full h-auto max-w-[95vw] lg:max-w-screen-xl max-h-[90vh] overflow-y-auto mx-auto bg-linear-to-br from-[#17a449] to-[#A3C537] text-white p-4 sm:p-6 lg:p-8 rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>BUAT PENGAJUAN BARU</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-shadow-white mb-2">
              PILIH TEMA
            </h3>
            <p className="text-sm text-shadow-white mb-6">
              Pilih tema yang anda ingin ajukan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tematik?.data && tematik?.data?.length > 0 ? (
              tematik?.data?.map((theme, index) => (
                <button
                  key={theme.id}
                  type="button"
                  className="w-full group border border-border rounded-xl p-6 transition-all duration-300 bg-card hover:cursor-pointer hover:scale-105 hover:border-2 hover:border-amber-500 hover:shadow-lg text-left focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={imgUrls[index]}
                        alt={imgUrls[index]}
                        className="w-20 h-20 rounded-lg object-cover border border-border transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-card-foreground text-base transition-colors">
                          {theme.tematik_kegiatan}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground  leading-relaxed text-justify">
                        {theme.deskripsi_tematik}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex flex-row items-center justify-center">
                {" "}
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
