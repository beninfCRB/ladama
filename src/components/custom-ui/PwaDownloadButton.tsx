"use client";

import { usePwaInstall } from "@/hooks/pwaInstall";

export default function PwaDownloadButton() {
  const { needRefresh, installPromptShown, promptInstall } = usePwaInstall();

  if (installPromptShown) return null;

  return (
    <button
      onClick={promptInstall}
      className="w-full text-white bg-[#f9b128] py-[8px] px-[16px] rounded-lg border-0 cursor-pointer"
    >
      {needRefresh ? "📲 Update & Download" : "📥 Install Aplikasi"}
    </button>
  );
}
