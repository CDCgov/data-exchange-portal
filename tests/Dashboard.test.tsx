import { screen, render } from "@testing-library/react";
import Dashboard from "../src/Dashboard";
import { vi } from "vitest";
import {
  createMockedAuthContext,
  withMemoryRouter,
  withMockedAuthProvider,
} from "./helpers";

vi.mock("react-oidc-context");

describe("Dashboard", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should show sidebar", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(<Dashboard />, "/dashboard", { protected: true }),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("Insights")).toBeInTheDocument();
  });

  it("should not show sidebar when not authenticated", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(<Dashboard />, "/dashboard", { protected: true }),
        createMockedAuthContext({ isAuthenticated: false, isLoading: false })
      )
    );

    expect(screen.queryByText("Insights")).toBeNull();
  });
});
