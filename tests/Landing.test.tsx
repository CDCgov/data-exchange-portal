import { screen } from "@testing-library/react";
import { Landing } from "../src/Landing";
import { renderWithAuthProvider } from "./helpers";

describe("Landing", () => {
  it("should show welcome message", () => {
    renderWithAuthProvider(<Landing />);

    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });
});
