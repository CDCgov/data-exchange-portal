import { render, screen } from "@testing-library/react";
import { Landing } from "../src/Landing";
import { createMockedAuthContext, withMockedAuthProvider } from "./helpers";
import { vi } from "vitest";
import { getEnv } from "../src/utils";

vi.mock("react-oidc-context");

describe("Landing", () => {
  it("should show welcome message", () => {
    render(
      withMockedAuthProvider(
        <Landing />,
        createMockedAuthContext({ isAuthenticated: false, isLoading: false })
      )
    );

    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });

  it("should show build number when environment variable defined", () => {
    const testBuildNumber = "1.2.3";
    vi.mocked(getEnv).mockReturnValue(testBuildNumber);
    // const mockedGetEnv = vi.fn(getEnv);
    // mockedGetEnv.mockRejectedValueOnce(testBuildNumber);

    render(
      withMockedAuthProvider(
        <Landing />,
        createMockedAuthContext({ isAuthenticated: false, isLoading: false })
      )
    );

    expect(screen.getByText(`Build 1.2.3`)).toBeInTheDocument();
  });
});
