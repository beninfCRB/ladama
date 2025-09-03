import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLogin from "./pages/auth/login";
import { describe, it, expect } from "vitest";

describe("AuthLogin page", () => {
  it("renders Log In heading via router", () => {
    const queryClient = new QueryClient();

    const router = createMemoryRouter(
      [
        {
          path: "/auth/login",
          element: <AuthLogin />,
        },
      ],
      {
        initialEntries: ["/auth/login"],
      }
    );

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByRole("heading", { name: /log in/i }));
    expect(screen.getByLabelText(/email/i));
  });
});
