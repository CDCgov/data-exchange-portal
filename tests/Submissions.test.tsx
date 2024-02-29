import { screen, render } from "@testing-library/react";
import Submissions from "../src/Submissions";

describe("Submissions page", () => {
  it("should show title", () => {
    render(<Submissions />);

    expect(screen.getByText("File Submissions")).toBeInTheDocument();
  });

  it("should show table headers", () => {
    render(<Submissions />);

    expect(screen.getByText("File Name")).toBeInTheDocument();
    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("Entity")).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText("Upload Status")).toBeInTheDocument();
    expect(screen.getByText("Submitted")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });
});
