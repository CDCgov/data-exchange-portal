import { render, waitFor } from "@testing-library/react";
import { useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";
import Callback from "src/components/Callback";
import { vi, Mock } from "vitest";

vi.mock("react-oidc-context", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe("Callback Component", () => {
  const mockNavigate = vi.fn();
  const mockAddUserLoaded = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocation as Mock).mockReturnValue({
      state: {
        from: {
          pathname: "/some-path",
        },
      },
    });
    (useAuth as Mock).mockReturnValue({
      events: {
        addUserLoaded: mockAddUserLoaded,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should navigate to the 'from' path when the user is loaded", async () => {
    render(<Callback />);

    // Simulate the user loaded event
    const userLoadedCallback = mockAddUserLoaded.mock.calls[0][0];
    userLoadedCallback();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/some-path", {
        replace: true,
      });
    });
  });

  it("should navigate to '/home' when there is no 'from' state", async () => {
    (useLocation as Mock).mockReturnValue({
      state: null,
    });

    render(<Callback />);

    // Simulate the user loaded event
    const userLoadedCallback = mockAddUserLoaded.mock.calls[0][0];
    userLoadedCallback();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
    });
  });
});
