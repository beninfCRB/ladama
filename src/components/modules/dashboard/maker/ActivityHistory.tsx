"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";

interface Activity {
  id: string;
  activity: string;
  progress: string;
  status: string;
  fundsReceived: string;
  budget: string;
  date: string;
  duration: string;
}

const activities: Activity[] = [
  {
    id: "07113-2508-00111",
    activity: "Pelatihan 50 Orang",
    progress: "10 %",
    status: "Dalam Proses Verifikasi",
    fundsReceived: "0",
    budget: "0",
    date: "2025-09-28",
    duration: "1 Hari",
  },
  {
    id: "07313-2508-00109",
    activity: "Sosialisasi 50 Orang",
    progress: "0 %",
    status: "Selesai Ditolak",
    fundsReceived: "0",
    budget: "28.100.000",
    date: "2025-09-28",
    duration: "1 Hari",
  },
  {
    id: "07313-2508-00107",
    activity: "Penanaman Pohon 1 Hectare",
    progress: "0 %",
    status: "Selesai Ditolak",
    fundsReceived: "0",
    budget: "7.736.000",
    date: "2025-09-27",
    duration: "1 Hari",
  },
];

const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "ID Kegiatan",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "activity",
    header: "Jenis Kegiatan",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("activity")}
      </div>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("progress")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="outline"
          className={`text-xs ${
            status === "Dalam Proses Verifikasi"
              ? "border-orange-300 text-orange-600 bg-orange-50"
              : "border-red-300 text-red-600 bg-red-50"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "fundsReceived",
    header: "Dana Diterima",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("fundsReceived")}
      </div>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("budget")}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Durasi",
    cell: ({ row }) => (
      <div className="text-gray-800 text-xs sm:text-sm">
        {row.getValue("duration")}
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
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: activities,
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
                  key={activity.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {activity.activity}
                        </p>
                        <p className="text-xs text-gray-500">{activity.id}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          activity.status === "Dalam Proses Verifikasi"
                            ? "border-orange-300 text-orange-600 bg-orange-50"
                            : "border-red-300 text-red-600 bg-red-50"
                        }`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Progress: </span>
                        <span className="text-gray-800">
                          {activity.progress}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Budget: </span>
                        <span className="text-gray-800">{activity.budget}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tanggal: </span>
                        <span className="text-gray-800">{activity.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Durasi: </span>
                        <span className="text-gray-800">
                          {activity.duration}
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
