import { useUserStore } from "@/stores/user.store";
import moment from "moment";
import { useState } from "react";
import { TypingAnimation } from "../magicui/typing-animation";
import Coutndown from "./Coutndown";
import { useRangeOpening } from "@/stores/rangeOpening.store";

function BreadCrumb() {
  const [date] = useState(moment());
  const user = useUserStore.getState().user;
  const rangeOpening = useRangeOpening().useGlobalStore(
    (s) => s["getRangeOpeningData"]
  );

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
      {rangeOpening?.data && <Coutndown />}
    </div>
  );
}

export default BreadCrumb;
