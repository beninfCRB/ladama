import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { toast } from "react-toastify";
import "./App.css";
import PageProgress from "./components/custom-ui/PageProgress";
import { router } from "./routes";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;

      const alreadyShown = localStorage.getItem("pwa-install-toast-shown");
      if (alreadyShown) return;

      toast.info(
        <button
          onClick={async () => {
            if (!promptEvent) return;
            promptEvent.prompt();
            const choice = await promptEvent.userChoice;
            if (choice.outcome === "accepted") {
              console.log("User accepted the install prompt");
              toast.success("✅ Aplikasi berhasil diinstall!");
              localStorage.setItem("pwa-installed", "true");
            } else {
              console.log("User dismissed the install prompt");
              toast.warn("❌ Install dibatalkan");
              localStorage.setItem("pwa-install-dismissed", "true");
            }
          }}
          style={{
            background: "#16a34a",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
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

      localStorage.setItem("pwa-install-toast-shown", "true");
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageProgress />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
