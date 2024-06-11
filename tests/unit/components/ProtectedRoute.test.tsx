import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "src/components/ProtectedRoute";

vi.mock("react-oidc-context", () => ({
  useAuth: vi.fn(),
  hasAuthParams: vi.fn(),
}));

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
  type MockUseAuth = {
    isAuthenticated: boolean;
    isLoading: boolean;
  };

  let mockUseAuth: MockUseAuth;
  let mockNavigate: ReturnType<typeof useNavigate>;

  beforeEach(() => {
    mockUseAuth = {
      isAuthenticated: false,
      isLoading: false,
    };

    (useAuth as unknown as jest.Mock).mockReturnValue(mockUseAuth);
    mockNavigate = vi.fn() as unknown as ReturnType<typeof useNavigate>;
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);

    (hasAuthParams as unknown as jest.Mock).mockReturnValue(false); // Ensure hasAuthParams returns false

    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should navigate to login if not authenticated and no OIDC storage", () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("should render children if authenticated", () => {
    mockUseAuth.isAuthenticated = true;

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
