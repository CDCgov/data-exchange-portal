import { screen, render } from "@testing-library/react";
import Dashboard from "../src/Dashboard";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import { createMockedAuthContext, withMockedAuthProvider } from "./helpers";

vi.mock("react-oidc-context");

describe("Dashboard", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should show sidebar", () => {
    render(
      withMockedAuthProvider(
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>,
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("Insights")).toBeInTheDocument();
  });
});
