import { render, screen } from "@testing-library/react";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import {
  withMockedAuthProvider,
  createMockedAuthContext,
} from "tests/utility/helpers";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ProtectedRoute", () => {
  it("renders children when authenticated", () => {
    const mockedAuthContext = createMockedAuthContext({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      withMockedAuthProvider(
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>,
        mockedAuthContext
      )
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login when not authenticated", () => {
    const mockedAuthContext = createMockedAuthContext({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      withMockedAuthProvider(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>,
        mockedAuthContext
      )
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
