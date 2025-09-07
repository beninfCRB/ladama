import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./routes";
import PageProgress from "./components/custom-ui/PageProgress";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageProgress />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
