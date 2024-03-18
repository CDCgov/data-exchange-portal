import { render, screen } from "@testing-library/react";
import App from "src/App";
import {
  createMockedAuthContext,
  withMockedAuthProvider,
} from "tests/utility/helpers";
import { vi } from "vitest";

vi.mock("react-oidc-context");

describe("App", () => {
  it.skip("should render landing page when no user session active", () => {
    // Todo: Add this test back once we resolve the issue with Nivo + CommonJS modules
    // render(
    //   withMockedAuthProvider(
    //     <App />,
    //     createMockedAuthContext({ isAuthenticated: false, isLoading: false })
    //   )
    // );

    // expect(screen.getByText("Login With SAMS")).toBeInTheDocument();
    expect(1).toEqual(1);
  });
});
