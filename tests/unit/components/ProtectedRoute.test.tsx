import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import {
  createMockedAuthContext,
  withMockedAuthProvider,
} from "tests/utility/helpers";

vi.mock("react-oidc-context");

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("src/utils/helperFunctions/env", () => ({
  getEnv: vi
    .fn()
    .mockImplementation(
      (key: "VITE_SAMS_AUTHORITY_URL" | "VITE_SAMS_CLIENT_ID") => {
        const env = {
          VITE_SAMS_AUTHORITY_URL: "https://auth.example.com",
          VITE_SAMS_CLIENT_ID: "client_id",
        };
        return env[key];
      }
    ),
}));

describe("ProtectedRoute", () => {
  let mockNavigate: ReturnType<typeof useNavigate>;

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should navigate to login if not authenticated and no OIDC storage", () => {
    render(
      withMockedAuthProvider(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>,
        createMockedAuthContext({ isAuthenticated: false, isLoading: false })
      )
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("should render children if authenticated", () => {
    render(
      withMockedAuthProvider(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>,
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
