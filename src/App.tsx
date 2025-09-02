import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Spinner } from "./components/ui/shadcn-io/spinner";

const queryClient = new QueryClient();
function App() {
  return (
    <Suspense fallback={<Spinner className="text-white" size={20} />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
