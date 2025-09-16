import { useEffect, useState } from "react";
import { TypingAnimation } from "../magicui/typing-animation";
import moment from "moment";
import { useUserStore } from "@/stores/user.store";
import { useRangeOpening } from "@/stores/rangeOpening.store";

function BreadCrumb() {
  const [date] = useState(moment());
  const user = useUserStore.getState().user;
  const rangeOpening = useRangeOpening().useGlobalStore().getRangeOpeningData;

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const end = moment(
        `${rangeOpening?.data?.tanggal_akhir} ${rangeOpening?.data?.jam_akhir}`
      );
      const diff = end.diff(now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex lg:flex-between">
      <div className="flex-3 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-2xl">🏠</span>
          <span className="text-gray-600 text-2xl">Halo,</span>
          <TypingAnimation className="font-semibold text-[#10a249] text-2xl">
            {user?.kelompok_masyarakat as string}
          </TypingAnimation>
        </div>
        <p className="text-sm font-medium text-yellow-500">
          {date.format("DD MMMM YYYY, HH:mm:ss")}
        </p>
      </div>
      <div className="flex-1 rounded-xl px-8 py-2 border bg-linear-to-br from-[#17a449] to-[#A3C537] shadow-sm text-white">
        <div className="grid grid-cols-2 space-x-4">
          <div className="flex flex-col">
            Batas waktu pengajuan :
            <span>
              {moment(rangeOpening?.data?.tanggal_akhir)
                .locale("id")
                .format("DD MMMM YYYY")}
            </span>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex flex-col">
              <span className="font-bold text-xl">
                {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}{" "}
                :
              </span>
              Jam
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl">
                {countdown.minutes < 10
                  ? `0${countdown.minutes}`
                  : countdown.minutes}{" "}
                :
              </span>
              Menit
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl">
                {countdown.seconds < 10
                  ? `0${countdown.seconds}`
                  : countdown.seconds}
              </span>
              Detik
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
