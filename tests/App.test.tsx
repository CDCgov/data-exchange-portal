import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { AuthProvider } from "react-oidc-context";

describe("App", () => {
  it("should render landing page when no user session active", () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText("Login With SAMS")).toBeInTheDocument();
  });
});
