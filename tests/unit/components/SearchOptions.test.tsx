import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useSearchParams } from "react-router-dom";
import { vi } from "vitest";
import SearchOptions from "src/components/SearchOptions";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useSearchParams: vi.fn(),
}));

vi.mock("src/utils/helperFunctions/metadataFilters", () => ({
  getDataRoutes: vi.fn(() => ["route1"]),
  getDataStreamOptions: vi.fn(() => [{ value: "stream1", display: "stream1" }]),
  getRoutesOptions: vi.fn(() => [{ value: "route1", display: "route1" }]),
}));

describe("SearchOptions", () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;
  beforeEach(() => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);
  });

  it("renders without crashing", () => {
    render(
      <RecoilRoot>
        <SearchOptions />
      </RecoilRoot>
    );

    expect(screen.getByLabelText("Data Stream")).toBeInTheDocument();
    expect(screen.getByLabelText("Data Route")).toBeInTheDocument();
    expect(screen.getByLabelText("Timeframe")).toBeInTheDocument();
  });

  it("handles optional forSubmissions prop correctly", () => {
    render(
      <RecoilRoot>
        <SearchOptions forSubmissions />
      </RecoilRoot>
    );

    expect(screen.getByLabelText("Jurisdiction")).toBeInTheDocument();
    expect(screen.getByLabelText("Sender")).toBeInTheDocument();
  });
});
