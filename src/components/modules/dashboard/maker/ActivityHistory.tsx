import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const activities = [
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

function ActivityHistory() {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-gray-600 font-medium text-sm sm:text-base">
          RIWAYAT KEGIATAN
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Masukkan Kata Kunci..."
            className="pl-10 text-sm"
          />
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600 min-w-[120px]">
                  ID Kegiatan
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 min-w-[150px]">
                  Jenis Kegiatan
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">
                  Progress
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 min-w-[140px]">
                  Status
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">
                  Dana Diterima
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">
                  Budget
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">
                  Tanggal
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">
                  Durasi
                </th>
                <th className="text-left py-3 px-2 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id} className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.id}
                  </td>
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.activity}
                  </td>
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.progress}
                  </td>
                  <td className="py-3 px-2">
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
                  </td>
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.fundsReceived}
                  </td>
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.budget}
                  </td>
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.date}
                  </td>
                  <td className="py-3 px-2 text-gray-800 text-xs sm:text-sm">
                    {activity.duration}
                  </td>
                  <td className="py-3 px-2">
                    <Button
                      variant="link"
                      className="text-green-600 hover:text-green-700 p-0 h-auto text-xs"
                    >
                      Lihat Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden space-y-3">
          {activities.map((activity, index) => (
            <Card key={activity.id} className="p-4">
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
                    <span className="text-gray-800">{activity.progress}</span>
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
                    <span className="text-gray-800">{activity.duration}</span>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityHistory;
