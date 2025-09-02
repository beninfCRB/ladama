import { createBrowserRouter, Navigate } from "react-router";
// @ts-ignore
import routes from "virtual:generated-pages-react";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Layout } from "./pages/Layout";
import NotFound from "./pages/NotFound";

function stripPrefix(routes: any[], prefix: string) {
  return routes.map((r) => ({
    ...r,
    path: r.path.replace(prefix, ""),
  }));
}

const authChildRoutes = stripPrefix(
  routes.filter((r: any) => r.path?.startsWith("auth")),
  "auth"
);
const makerChildRoutes = stripPrefix(
  routes.filter((r: any) => r.path?.startsWith("maker")),
  "maker"
);

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/auth/login" replace /> },
  {
    path: "/auth",
    children: [
      {
        children: [
          ...authChildRoutes,
          { index: true, element: <Navigate to="/auth/login" replace /> },
        ],
      },
    ],
  },
  {
    path: "/maker",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          ...makerChildRoutes,
          { index: true, element: <Navigate to="/maker/dashboard" replace /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export { router };
