import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnv } from "src/utils/helperFunctions/env";

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const expires_in = auth.user?.expires_in ?? 0;

    if ((!auth.isAuthenticated && !auth.isLoading) || expires_in <= 0) {
      const oidcStorage = window.localStorage.getItem(
        `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
          "VITE_SAMS_CLIENT_ID"
        )}`
      );

      if (oidcStorage) {
        auth.signinSilent()?.catch(() => navigate("/login", { replace: true }));
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [auth, location, navigate]);

  return children;
}

export default ProtectedRoute;
