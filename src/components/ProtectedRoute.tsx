import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { getEnv } from "src/utils/helperFunctions/env";

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      const oidcStorage = window.localStorage.getItem(
        `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
          "VITE_SAMS_CLIENT_ID"
        )}`
      );

      if (oidcStorage) {
        auth.signinSilent()?.catch((e) => {
          console.log("Silent sign-in failed:", e);
          navigate("/login", { replace: true });
        });
      } else {
        console.log("No valid token found, redirecting to login page");
        setHasTriedSignin(true);
        navigate("/login", { replace: true });
      }
    }
  }, [auth, hasTriedSignin, location, navigate]);

  return children;
}

export default ProtectedRoute;
