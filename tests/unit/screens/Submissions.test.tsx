import { RecoilRoot } from "recoil";
import { screen, render, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import Submissions from "src/screens/Submissions";
import {
  createMockedAuthContext,
  withMemoryRouter,
  withMockedAuthProvider,
} from "tests/utility/helpers";
import { dataStreamIdAtom, dataRouteAtom } from "src/state/searchParams";

vi.mock("react-oidc-context");

describe("Submissions page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should show title", () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(
          <RecoilRoot>
            <Submissions />
          </RecoilRoot>,
          "/home/submissions",
          {
            protected: true,
          }
        ),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(screen.getByText("Track Submissions")).toBeInTheDocument();
  });

  it("should show table when data exists", async () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(
          <RecoilRoot
            initializeState={({ set }) => {
              set(dataStreamIdAtom, "aims-celr");
              set(dataRouteAtom, "csv");
            }}>
            <Submissions />
          </RecoilRoot>,
          "/home/submissions",
          {
            protected: true,
          }
        ),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    await waitFor(() =>
      expect(screen.getByText("File Name")).toBeInTheDocument()
    );

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(6);
    expect(headers[0]).toHaveTextContent("File Name");
    expect(headers[1]).toHaveTextContent("Jurisdiction");
    expect(headers[2]).toHaveTextContent("Sent By");
    expect(headers[3]).toHaveTextContent("Upload Status");
    expect(headers[4]).toHaveTextContent("Submitted");
    expect(headers[5]).toHaveTextContent("Details");
  });

  it("should show no data matches message when no data exists", async () => {
    render(
      withMockedAuthProvider(
        withMemoryRouter(
          <RecoilRoot>
            <Submissions />
          </RecoilRoot>,
          "/home/submissions",
          {
            protected: true,
          }
        ),
        createMockedAuthContext({ isAuthenticated: true, isLoading: false })
      )
    );

    expect(
      screen.getByText(
        "No items found. Try expanding the timeframe or modifying the filters."
      )
    ).toBeInTheDocument();
  });
});
