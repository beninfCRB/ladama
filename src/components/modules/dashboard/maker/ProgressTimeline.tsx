"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { formatRupiah } from "@/lib/rupiah";
import { useModalStore } from "@/stores/allModal";
import { type LogKegiatanType } from "@/stores/logKegiatan";
import type { RiwayatPengajuanType } from "@/stores/riwayatPengajuan.store";
import moment from "moment";

interface ProgressTimelineProps {
  rowSelected?: RiwayatPengajuanType;
  logKegiatan?: Array<LogKegiatanType>;
}

function ProgressTimeline({ logKegiatan, rowSelected }: ProgressTimelineProps) {
  const { modals, closeModal } = useModalStore();

  return (
    <Dialog
      open={modals["ProgressTimeline"]}
      onOpenChange={(open) => !open && closeModal("ProgressTimeline")}
    >
      <DialogContent className="w-full lg:min-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-12 bg-linear-to-br from-[#17a449] to-[#A3C537] text-white">
        {rowSelected ? (
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
            {/* Detail Kegiatan */}
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>Detail Kegiatan</DialogTitle>
                <DialogDescription className="bg-card rounded-lg p-4 text-black">
                  Paket Kegiatan:{" "}
                  <span className="font-semibold">
                    {rowSelected?.tematik_kegiatan}
                  </span>
                  <br />
                  Kegiatan:{" "}
                  <span className="font-bold">
                    {rowSelected?.jenis_kegiatan}
                  </span>
                  <br />
                  Nomor:{" "}
                  <span className="font-mono">
                    {rowSelected?.nomor_pengajuan}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">Dana yang disetujui:</span>{" "}
                  <span className="font-bold">
                    {formatRupiah(rowSelected?.dana_yang_disetujui)}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Dana dicairkan:</span>{" "}
                  {formatRupiah(rowSelected?.dana_yang_dicairkan)}
                </p>
                <p>
                  <span className="font-medium">Tanggal kegiatan:</span>{" "}
                  {moment(rowSelected?.tanggal_kegiatan.split(" ")[0]).format(
                    "DD MMMM yyyy"
                  )}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              {/* Desktop timeline */}
              <ol className="hidden sm:block relative border-s border-gray-200">
                {logKegiatan?.map((step, index) => (
                  <li key={step.id} className="mb-10 ms-6">
                    <span
                      className={`absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ${
                        step.tanggal_selesai === null
                          ? "bg-gray-400"
                          : "bg-green-600"
                      } ring-8 ring-white`}
                    />

                    <h3 className="font-semibold text-white">
                      Tahap {index + 1}: {step.tahapan_kegiatan}
                    </h3>

                    {step.tanggal_selesai !== null ? (
                      <>
                        {rowSelected?.tahapan_pengajuan < 20 && (
                          <>
                            {Number(step.code_id) === 4 ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className={`mt-2 ${
                                  step.tanggal_selesai !== null &&
                                  "bg-green-600 text-white"
                                }`}
                                disabled={step.tanggal_selesai === null}
                              >
                                Form Perjanjian
                              </Button>
                            ) : Number(step.code_id) === 6 ||
                              Number(step.code_id) === 9 ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className={`mt-2 ${
                                  step.tanggal_selesai !== null &&
                                  "bg-green-600 text-white"
                                }`}
                                disabled={step.tanggal_selesai === null}
                              >
                                Form Laporan
                              </Button>
                            ) : (
                              <Button
                                variant="link"
                                className="text-white text-sm hover:underline"
                              >
                                Lihat Detail
                              </Button>
                            )}
                          </>
                        )}
                        <time className="block mt-1 text-sm text-white">
                          {`Selesai ${moment(
                            step.tanggal_selesai.split(" ")[0]
                          ).format("DD MMMM YYYY")}`}
                        </time>
                      </>
                    ) : (
                      <time className="block mt-1 text-sm text-white">
                        Belum Mulai
                      </time>
                    )}
                  </li>
                ))}
              </ol>

              {/* Mobile timeline (card style) */}
              <div className="sm:hidden flex flex-col gap-4">
                {logKegiatan?.map((step, index) => (
                  <div
                    key={step.id}
                    className="rounded-lg bg-white/10 p-4 shadow"
                  >
                    <h3 className="font-semibold">
                      Tahap {index + 1}: {step.tahapan_kegiatan}
                    </h3>
                    <p className="text-sm mt-1">
                      {step.tanggal_selesai
                        ? `Selesai ${moment(
                            step.tanggal_selesai.split(" ")[0]
                          ).format("DD MMMM YYYY")}`
                        : "Belum Mulai"}
                    </p>

                    {Number(step.code_id) === 4 ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        disabled={step.tanggal_selesai === null}
                      >
                        Form Perjanjian
                      </Button>
                    ) : Number(step.code_id) === 6 ||
                      Number(step.code_id) === 9 ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        disabled={step.tanggal_selesai === null}
                      >
                        Form Laporan
                      </Button>
                    ) : (
                      <Button
                        variant="link"
                        className="text-white text-sm mt-2 hover:underline"
                      >
                        Lihat Detail
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProgressTimeline;
