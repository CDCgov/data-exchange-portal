import { render, screen } from "@testing-library/react";
import { Landing } from "../src/Landing";
import { createMockedAuthContext, withMockedAuthProvider } from "./helpers";
import { vi } from "vitest";

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
});
