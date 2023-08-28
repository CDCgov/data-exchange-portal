import { RenderResult, render } from "@testing-library/react";
import { AuthProvider } from "react-oidc-context";

export const renderWithAuthProvider = (
  children: React.ReactNode
): RenderResult => {
  return render(<AuthProvider>{children}</AuthProvider>);
};
