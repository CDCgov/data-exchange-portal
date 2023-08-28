import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithAuthProvider } from "./helpers";

describe("App", () => {
  it("should render landing page when no user session active", () => {
    renderWithAuthProvider(<App />);

    expect(screen.getByText("Login With SAMS")).toBeInTheDocument();
  });
});
