import { screen, render } from "@testing-library/react";

import PieChart from "src/components/PieChart";

import reportCounts from "src/mocks/data/reportCounts.json";

describe("PieChart component", () => {
  console.log(reportCounts);

  it("should show piechart title", () => {
    render(<PieChart data={reportCounts} />);

    expect(screen.getByText("File Submissions")).toBeInTheDocument();
  });
});
