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

export function CreateSubmissionModal() {
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
      <DialogContent className="max-w-2xl w-[90%] sm:w-full max-h-[90vh] overflow-y-auto mx-auto bg-linear-to-br from-[#17a449] to-[#A3C537] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>BUAT PENGAJUAN BARU</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-2 lg:p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-shadow-white mb-2">
              PILIH TEMA
            </h3>
            <p className="text-sm text-shadow-white mb-6">
              Pilih tema yang anda ingin ajukan
            </p>
          </div>

          <div className="space-y-4">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className="border border-border rounded-lg p-4 hover:border-ring hover:bg-accent/50 cursor-pointer transition-all duration-200 bg-card hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={imgUrls[index]}
                      alt={imgUrls[index]}
                      className="w-20 h-20 rounded-lg object-cover border border-border"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-card-foreground text-base">
                        {theme.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
