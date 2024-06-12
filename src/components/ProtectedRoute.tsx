import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnv } from "src/utils/helperFunctions/env";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const expires_in = auth.user?.expires_in ?? 0;

    if (!auth.isAuthenticated || expires_in <= 0) {
      const oidcStorage = window.localStorage.getItem(
        `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
          "VITE_SAMS_CLIENT_ID"
        )}`
      );

      if (!oidcStorage) {
        navigate("/login", { replace: true });
      }

      const oidcDetails = oidcStorage
        ? JSON.parse(oidcStorage)
        : { expires_at: 0 };
      const expireTime = oidcDetails.expires_at * 1000;
      const isTokenExpired = expireTime < Date.now();

      if (isTokenExpired) {
        navigate("/login", { replace: true });
      }

      auth.signinSilent()?.catch(() => {
        navigate("/login", { replace: true });
      });
    }
  }, [auth, location, navigate]);

  return children;
}
