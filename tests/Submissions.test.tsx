import { screen, render } from "@testing-library/react";
import { vi } from "vitest";

import Submissions from "src/screens/Submissions";
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
        withMemoryRouter(<Submissions />, "/home/submissions", {
          protected: true,
        }),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("File Submissions")).toBeInTheDocument();
  });

  // Todo: Update to handle MSW/mocking
  it.skip("should show table headers", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(<Submissions />, "/home/submissions", {
          protected: true,
        }),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("File Name")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("Entity")).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText("Upload Status")).toBeInTheDocument();
    expect(screen.getByText("Submitted")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });
});
