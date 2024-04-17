import { PropsWithChildren, useEffect } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { getEnv } from "src/utils/helperFunctions/env";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ignore Auth if running locally with mocked data
    if (getEnv("VITE_DEV_MOCKING_ENABLED")) return;

    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      const oidcStorage = sessionStorage.getItem(
        `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
          "VITE_SAMS_CLIENT_ID"
        )}`
      );

      if (oidcStorage) {
        auth.signinSilent();
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [auth, navigate]);

  return children;
}
