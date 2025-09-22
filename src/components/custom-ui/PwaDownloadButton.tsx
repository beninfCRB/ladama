"use client";
import { useRegisterSW } from "virtual:pwa-register/react";

export default function PwaDownloadButton() {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

  const handleClick = () => {
    if (needRefresh) {
      updateServiceWorker(true);
    } else {
      alert(
        offlineReady
          ? "Aplikasi sudah bisa dipakai offline 🎉"
          : "Sedang menyiapkan asset offline..."
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-white bg-[#f9b128] py-[8px] px-[16px] rounded-lg border-0 cursor-pointer"
    >
      {needRefresh ? "📲 Update & Download" : "Download Offline"}
    </button>
  );
}
