import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SearchOptions from "src/components/SearchOptions";
import { Timeframe } from "src/types/timeframes";

const setup = (props = {}) => {
  render(
    <MemoryRouter>
      <RecoilRoot>
        <SearchOptions {...props} />
      </RecoilRoot>
    </MemoryRouter>
  );
};

describe("SearchOptions component", () => {
  it("renders without errors", () => {
    setup();

    expect(screen.getByLabelText("Data Stream")).toBeInTheDocument();
    expect(screen.getByLabelText("Data Route")).toBeInTheDocument();
    expect(screen.getByLabelText("Timeframe")).toBeInTheDocument();
  });

  it("renders with default values", () => {
    setup();

    const dataStreamSelect = screen.getByLabelText(
      "Data Stream"
    ) as HTMLSelectElement;
    const dataRouteSelect = screen.getByLabelText(
      "Data Route"
    ) as HTMLSelectElement;
    const timeframeSelect = screen.getByLabelText(
      "Timeframe"
    ) as HTMLSelectElement;

    expect(dataStreamSelect.value).toBe("");
    expect(dataRouteSelect.value).toBe("");
    expect(timeframeSelect.value).toBe("Last 7 Days");
  });

  it("renders custom timeframe inputs", () => {
    setup();

    const timeframeSelect = screen.getByLabelText(
      "Timeframe"
    ) as HTMLSelectElement;
    fireEvent.change(timeframeSelect, { target: { value: Timeframe.Custom } });

    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  it("conditionally renders jurisdiction and sender filters", () => {
    setup({ forSubmissions: true });

    expect(screen.getByLabelText("Jurisdiction")).toBeInTheDocument();
    expect(screen.getByLabelText("Sender")).toBeInTheDocument();
  });
});
