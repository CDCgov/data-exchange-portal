import { screen, render } from "@testing-library/react";
import Submissions from "../src/Submissions";
import { vi } from "vitest";
import {
  createMockedAuthContext,
  withMemoryRouter,
  withMockedAuthProvider,
} from "./helpers";

vi.mock("react-oidc-context");

describe("Submissions page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should show title", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(<Submissions />, "/dashboard", { protected: true }),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("File Submissions")).toBeInTheDocument();
  });
});
