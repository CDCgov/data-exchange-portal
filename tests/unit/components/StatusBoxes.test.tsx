import { render, screen } from "@testing-library/react";

import StatusBoxes from "src/components/StatusBoxes";
import { defaultReportCounts, ReportCounts } from "src/utils/api/reportCounts";

const validData: ReportCounts = defaultReportCounts;

validData.status_counts.uploaded.counts = 41;

describe("StatusBoxes", () => {
  it("should render a status box with correct data", () => {
    render(<StatusBoxes data={validData} />);

    expect(screen.getByText("Upload Complete")).toBeInTheDocument();
    expect(screen.getByText("41")).toBeInTheDocument();
  });
});
