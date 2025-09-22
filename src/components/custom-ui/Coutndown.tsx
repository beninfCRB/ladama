import { useDeadlineStore } from "@/stores/countDown.store";
import { useRangeOpening } from "@/stores/rangeOpening.store";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function Countdown() {
  const rangeOpening = useRangeOpening().useGlobalStore(
    (s) => s["getRangeOpeningData"]
  );

  const { setIsBeforeDeadline } = useDeadlineStore();

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate();
  const hasNavigated = useRef(false);

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

      if (diff <= 0) {
        setIsBeforeDeadline(false);
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);

        if (!hasNavigated.current) {
          hasNavigated.current = true;
          navigate(0);
        }
        return;
      }

      setIsBeforeDeadline(true);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [rangeOpening, setIsBeforeDeadline, navigate]);

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
              {countdown.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-sm">Jam</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl">
              {countdown.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-sm">Menit</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl">
              {countdown.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-sm">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
