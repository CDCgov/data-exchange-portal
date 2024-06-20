import { render, waitFor } from "@testing-library/react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import Logout from "src/components/Logout";
import { vi, Mock } from "vitest";

vi.mock("react-oidc-context", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Logout Component", () => {
  const mockNavigate = vi.fn();
  const mockRemoveUser = vi.fn(() => Promise.resolve());

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useAuth as Mock).mockReturnValue({
      removeUser: mockRemoveUser,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call removeUser and navigate to /login", async () => {
    render(<Logout />);

    await waitFor(() => {
      expect(mockRemoveUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });
  });
});
