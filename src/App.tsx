import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./routes";
import PageProgress from "./components/custom-ui/PageProgress";
import { useEffect } from "react";

const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    const handler = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      console.log("beforeinstallprompt fired");

      promptEvent.prompt(); // munculkan popup install

      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      });
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
