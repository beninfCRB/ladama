import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { toast } from "react-toastify";
import "./App.css";
import PageProgress from "./components/custom-ui/PageProgress";
import { router } from "./routes";
import { usePwaStore } from "./stores/pwa.store";

const queryClient = new QueryClient();

function App() {
  const { setDeferredPrompt, installPromptShown, setInstallPromptShown } =
    usePwaStore();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;

      if (installPromptShown) return;

      setDeferredPrompt(promptEvent);

      toast.info(
        <button
          className="bg-[#16a34a] text-white py-[8px] px-[16px] rounded-lg border-0 cursor-pointer"
          onClick={async () => {
            if (!promptEvent) return;
            await promptEvent.prompt();
            const choice = await promptEvent.userChoice;
            if (choice.outcome === "accepted") {
              console.log("✅ User accepted install");
              toast.success("App berhasil diinstall");
            } else {
              console.log("❌ User dismissed install");
              toast.warn("Install dibatalkan");
            }
            setDeferredPrompt(null);
          }}
        >
          📲 Install App
        </button>,
        {
          position: "bottom-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
        }
      );

      setInstallPromptShown(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [installPromptShown, setDeferredPrompt, setInstallPromptShown]);

  return (
    <QueryClientProvider client={queryClient}>
      <PageProgress />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
