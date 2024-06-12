import { render, screen } from "@testing-library/react";
import PieChart from "src/components/PieChart";
import { describe, it, expect } from "vitest";
import { ReportCounts } from "src/utils/api/reportCounts";
import { vi } from "vitest";

vi.mock("@nivo/pie", () => {
  return {
    Pie: () => <div>Pie Chart</div>,
  };
});

const mockData: ReportCounts = {
  total_counts: 100,
  status_counts: {
    uploaded: {
      counts: 50,
    },
    uploading: {
      counts: 30,
    },
    failed: {
      counts: 20,
    },
  },
};

describe("PieChart Component", () => {
  it("renders without crashing", () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText("Submission Statuses")).toBeInTheDocument();
  });

  it("renders the legend with correct data", () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });

  it("calculates percentages correctly", () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText("50.0%")).toBeInTheDocument();
    expect(screen.getByText("30.0%")).toBeInTheDocument();
    expect(screen.getByText("20.0%")).toBeInTheDocument();
  });

  it("renders the correct number of legend items", () => {
    render(<PieChart data={mockData} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);
  });
});
