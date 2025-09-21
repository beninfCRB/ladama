import CustomTablist from "@/components/custom-ui/CustomTablist";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/rupiah";
import type { submissionFormReturnType } from "@/schemas/submission.schema";
import type { PaketKegaiatanTypes } from "@/stores/paketKegiatan.store";
import type {
  KomponenRabArrayTypes,
  KomponenRabKeys,
} from "@/stores/pengajuanKegiatan.store";

interface TableRabProps {
  form: submissionFormReturnType;
  rab?: KomponenRabArrayTypes;
  setRab: React.Dispatch<
    React.SetStateAction<KomponenRabArrayTypes | undefined>
  >;
  paketKegiatan?: Array<PaketKegaiatanTypes>;
}

function TableRab({ form, rab, setRab, paketKegiatan }: TableRabProps) {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-shadow-white mb-2">
          PAKET KEGIATAN
        </h3>
        <p className="text-xl text-amber-400">
          {
            paketKegiatan?.find(
              (item) => item.id === form.watch().paket_kegiatan_id
            )?.jenis_kegiatan
          }
        </p>
      </div>
      <CustomTablist />

      <div className="bg-card p-6 rounded-lg space-y-4">
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted">
                <TableHead className="min-w-[40px]">No</TableHead>
                <TableHead className="min-w-[150px]">Deskripsi</TableHead>
                <TableHead className="min-w-[100px]">Satuan</TableHead>
                <TableHead className="min-w-[80px] text-right">
                  Jumlah
                </TableHead>
                <TableHead className="min-w-[120px] text-right">
                  Harga Unit
                </TableHead>
                <TableHead className="min-w-[120px] text-right">
                  Harga Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rab &&
                rab?.komponen_rab &&
                (Object.keys(rab.komponen_rab) as KomponenRabKeys[]).map(
                  (kategori, i) => (
                    <>
                      <TableRow className="bg-muted">
                        <TableCell className="text-muted">
                          {String.fromCharCode(i + 65)}
                        </TableCell>
                        <TableCell
                          colSpan={5}
                          className="font-semibold text-muted-foreground"
                        >
                          {kategori}
                        </TableCell>
                      </TableRow>
                      {rab.komponen_rab[kategori].map((detail, j) => (
                        <TableRow
                          key={`${kategori}-${j}`}
                          className="hover:bg-muted/20 transition-colors"
                        >
                          <TableCell className="text-muted-foreground">
                            {j + 1}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {detail.komponen_rab}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {detail.satuan}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            <Input
                              type="number"
                              min={0}
                              value={detail.qty === 0 ? "" : detail.qty}
                              onChange={(e) => {
                                let val = e.target.value;

                                if (val === "") {
                                  setRab((prev) => {
                                    if (!prev) return prev;
                                    const updated = { ...prev };
                                    updated.komponen_rab[kategori][j] = {
                                      ...updated.komponen_rab[kategori][j],
                                      qty: 0,
                                    };
                                    return updated;
                                  });
                                  return;
                                }

                                if (/^0\d+/.test(val)) {
                                  val = String(Number(val));
                                }

                                const newQty = Number(val);

                                setRab((prev) => {
                                  if (!prev) return prev;
                                  const updated = { ...prev };
                                  updated.komponen_rab[kategori][j] = {
                                    ...updated.komponen_rab[kategori][j],
                                    qty: newQty,
                                  };
                                  return updated;
                                });
                              }}
                              className="w-24 text-right"
                            />
                          </TableCell>
                          <TableCell className="text-muted-foreground text-right">
                            {formatRupiah(detail.harga_unit)}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-right font-semibold">
                            {formatRupiah(detail.qty * detail.harga_unit)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )
                )}
              <TableRow className="border-t-2 border-border bg-muted">
                <TableCell colSpan={5}></TableCell>
                <TableCell className="text-right font-bold text-lg">
                  TOTAL:{" "}
                  {formatRupiah(
                    rab
                      ? (
                          Object.keys(rab.komponen_rab) as KomponenRabKeys[]
                        ).reduce((acc, kategori) => {
                          return (
                            acc +
                            rab.komponen_rab[kategori].reduce(
                              (sum, item) => sum + item.qty * item.harga_unit,
                              0
                            )
                          );
                        }, 0)
                      : 0
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default TableRab;
