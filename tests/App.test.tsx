import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("should render landing page when no user session active", () => {
    render(<App />);

    expect(screen.getByText("Login With SAMS")).toBeInTheDocument();
  });
});
