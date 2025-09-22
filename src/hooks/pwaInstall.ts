import { useEffect, useCallback } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { usePwaStore, type BeforeInstallPromptEvent } from "@/stores/pwa.store";

export function usePwaInstall() {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
  const {
    deferredPrompt,
    installPromptShown,
    setDeferredPrompt,
    setInstallPromptShown,
  } = usePwaStore();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [setDeferredPrompt]);

  const promptInstall = useCallback(async () => {
    if (needRefresh) {
      updateServiceWorker(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setInstallPromptShown(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        offlineReady
          ? "Aplikasi sudah bisa dipakai offline 🎉"
          : "Sedang menyiapkan asset offline..."
      );
    }
  }, [
    needRefresh,
    updateServiceWorker,
    deferredPrompt,
    offlineReady,
    setDeferredPrompt,
    setInstallPromptShown,
  ]);

  return {
    offlineReady,
    needRefresh,
    installPromptShown,
    promptInstall,
  };
}
