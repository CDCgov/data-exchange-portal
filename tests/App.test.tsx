import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { createMockedAuthContext, withMockedAuthProvider } from "./helpers";
import { vi } from "vitest";

vi.mock("react-oidc-context");

describe("App", () => {
  it("should render landing page when no user session active", () => {
    render(
      withMockedAuthProvider(
        <App />,
        createMockedAuthContext({ isAuthenticated: false, isLoading: false })
      )
    );

    expect(screen.getByText("Login With SAMS")).toBeInTheDocument();
  });
});