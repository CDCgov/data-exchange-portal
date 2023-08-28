import { screen, render } from "@testing-library/react";
import Dashboard from "../src/Dashboard";
import { AuthProvider, useAuth } from "react-oidc-context";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("react-oidc-context");

describe("Dashboard", () => {
  it("should show sidebar", () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Insights")).toBeInTheDocument();
  });
});
