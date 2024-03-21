import { render, screen } from "@testing-library/react";

import StatusBoxes from "src/components/StatusBoxes";

const validData = {
  totalCounts: 57,
  reportCounts: [
    {
      id: "upload_complete",
      count: 41,
    },
  ],
};

describe("StatusBoxes", () => {
  it("should render a status box with correct data", () => {
    render(<StatusBoxes data={validData} />);

    expect(screen.getByText("Upload Complete")).toBeInTheDocument();
    expect(screen.getByText("41")).toBeInTheDocument();
  });
});
