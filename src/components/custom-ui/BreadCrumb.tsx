import { useEffect, useState } from "react";
import { TypingAnimation } from "../magicui/typing-animation";
import moment from "moment";
import { useUserStore } from "@/stores/user.store";

function BreadCrumb() {
  const [date, setDate] = useState(moment());
  const user = useUserStore.getState().user;

  useEffect(() => {
    const timer = setInterval(() => setDate(moment()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:block space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">🏠</span>
        <span className="text-gray-600">Halo,</span>
        <TypingAnimation className="font-semibold text-[#10a249] text-md">
          {user?.kelompok_masyarakat as string}
        </TypingAnimation>
      </div>
      <p className="text-sm font-medium text-yellow-500">
        {date.format("DD MMMM YYYY, HH:mm:ss")}
      </p>
    </div>
  );
}

export default BreadCrumb;
