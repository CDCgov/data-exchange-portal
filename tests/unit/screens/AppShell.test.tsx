import { screen, render } from "@testing-library/react";
import AppShell from "src/screens/AppShell";
import { vi } from "vitest";
import {
  createMockedAuthContext,
  withMemoryRouter,
  withMockedAuthProvider,
} from "tests/utility/helpers";

describe("Shell", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should show sidebar", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(<AppShell />, "/home/dashboard", {
          protected: true,
        }),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("Insights")).toBeInTheDocument();
  });

  it("should not show sidebar when not authenticated", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(<AppShell />, "/", { protected: true }),
        createMockedAuthContext({ isAuthenticated: false, isLoading: false })
      )
    );

    expect(screen.queryByText("Insights")).toBeNull();
  });
});
