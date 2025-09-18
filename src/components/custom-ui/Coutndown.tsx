import { useRangeOpening } from "@/stores/rangeOpening.store";
import moment from "moment";
import { useEffect, useState } from "react";

function Coutndown() {
  const rangeOpening = useRangeOpening().useGlobalStore(
    (s) => s["getRangeOpeningData"]
  );

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        !rangeOpening?.data?.tanggal_akhir ||
        !rangeOpening?.data?.jam_akhir
      ) {
        return;
      }

      const now = moment();
      const end = moment(
        `${rangeOpening.data.tanggal_akhir} ${rangeOpening.data.jam_akhir}`,
        "YYYY-MM-DD HH:mm:ss"
      );

      if (!end.isValid()) {
        console.error("Invalid end date:", rangeOpening.data);
        return;
      }

      const diff = end.diff(now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [rangeOpening]);

  return (
    <div className="flex-1 rounded-xl px-4 py-2 border bg-gradient-to-br from-[#17a449] to-[#A3C537] shadow-sm text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col text-center md:text-left">
          <span className="font-medium">Batas waktu pengajuan</span>
          <span className="text-lg font-semibold">
            {moment(rangeOpening?.data?.tanggal_akhir)
              .locale("id")
              .format("DD MMMM YYYY")}
          </span>
        </div>

        <div className="grid grid-cols-3 text-center gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-2xl">
              {Number(countdown.hours) < 10
                ? `0${countdown.hours}`
                : countdown.hours}
            </span>
            <span className="text-sm">Jam</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl">
              {Number(countdown.minutes) < 10
                ? `0${countdown.minutes}`
                : countdown.minutes}
            </span>
            <span className="text-sm">Menit</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl">
              {Number(countdown.seconds) < 10
                ? `0${countdown.seconds}`
                : countdown.seconds}
            </span>
            <span className="text-sm">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coutndown;
