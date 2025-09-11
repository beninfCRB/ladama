"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dictionary, DictionaryColors, ProgressValue } from "@/lib/progress";
import { formatRupiah } from "@/lib/rupiah";
import {
  updatePersentaseTahapanPengajuan,
  useRiwayatPengajuan,
  type RiwayatPengajuanType,
} from "@/stores/riwayatPengajuan.store";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";

const columns: ColumnDef<RiwayatPengajuanType>[] = [
  {
    accessorKey: "nomor_pengajuan",
    header: "ID Kegiatan",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("nomor_pengajuan")}
      </div>
    ),
  },
  {
    accessorKey: "jenis_kegiatan",
    header: "Jenis Kegiatan",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("jenis_kegiatan")}
      </div>
    ),
  },
  {
    accessorKey: "tahapan_pengajuan",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("tahapan_pengajuan") as number;
      return (
        <div className="text-gray-800 text-xs sm:text-sm">
          {ProgressValue[progress as keyof typeof ProgressValue]} %
        </div>
      );
    },
  },
  {
    accessorKey: "persentase_tahapan_pengajuan",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("persentase_tahapan_pengajuan") as number;
      return (
        <Badge
          variant="outline"
          className={`text-xs ${
            DictionaryColors[status as keyof typeof DictionaryColors]
          }`}
        >
          {Dictionary[status as keyof typeof Dictionary]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dana_yang_disetujui",
    header: "Dana Diterima",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {formatRupiah(row.getValue("dana_yang_disetujui"))}
      </div>
    ),
  },
  {
    accessorKey: "dana_yang_diajukan",
    header: "Budget",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {formatRupiah(row.getValue("dana_yang_diajukan"))}
      </div>
    ),
  },
  {
    accessorKey: "tanggal_kegiatan",
    header: "Tanggal",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {moment(row.getValue("tanggal_kegiatan")).format("DD MMMM YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "lokasi",
    header: "Durasi",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("lokasi")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <Button
        variant="link"
        className="text-green-600 hover:text-green-700 p-0 h-auto text-xs"
      >
        Lihat Detail
      </Button>
    ),
  },
];

function ActivityHistory() {
  const activities = useRiwayatPengajuan().useGlobalStore(
    (s) => s["getDataRiwayatPengajuanData"]
  );

  const transformedData = useMemo(() => {
    return activities?.data
      ? updatePersentaseTahapanPengajuan(activities.data)
      : [];
  }, [activities]);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: transformedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-gray-600 font-medium text-sm sm:text-base">
          RIWAYAT KEGIATAN
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Masukkan Kata Kunci..."
              className="pl-10 text-sm"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Tampilkan:
            </span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="overflow-x-auto overflow-y-auto max-h-96 border rounded-lg">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-gray-200">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left py-3 px-2 font-medium text-gray-600 min-w-[120px]"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sm:hidden">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {table.getRowModel().rows.map((row) => {
              const activity = row.original;
              return (
                <Card
                  key={activity.nomor_pengajuan}
                  className="p-0 hover:bg-gray-50 transition-colors duration-150 cursor-pointer shadow-none border-none"
                >
                  <MagicCard
                    className="p-4"
                    gradientColor={"from-[#17a449] to-[#A3C537]"}
                    gradientSize={250}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm text-gray-800">
                            {activity.jenis_kegiatan} {activity.jumlah}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.nomor_pengajuan}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            DictionaryColors[
                              activity.tahapan_pengajuan as keyof typeof DictionaryColors
                            ]
                          }`}
                        >
                          {
                            Dictionary[
                              activity.tahapan_pengajuan as keyof typeof Dictionary
                            ]
                          }
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Progress: </span>
                          <span className="text-gray-800">
                            {
                              ProgressValue[
                                activity.persentase_tahapan_pengajuan as keyof typeof ProgressValue
                              ]
                            }{" "}
                            %
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Budget: </span>
                          <span className="text-gray-800">
                            {formatRupiah(activity.dana_yang_diajukan)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tanggal: </span>
                          <span className="text-gray-800">
                            {moment(activity.tanggal_kegiatan).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Durasi: </span>
                          <span className="text-gray-800">
                            {activity.nomor_pengajuan}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="link"
                          className="text-green-600 hover:text-green-700 p-0 h-auto text-xs"
                        >
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </MagicCard>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
          <div className="text-sm text-gray-600">
            Menampilkan{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            sampai{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            dari {table.getFilteredRowModel().rows.length} data
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">
                Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
                {table.getPageCount()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityHistory;
