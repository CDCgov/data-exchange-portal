import { PropsWithChildren, useEffect } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { getEnv } from "src/utils/helperFunctions/env";

function AuthRetrieval({ children }: PropsWithChildren) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (
        !hasAuthParams() &&
        !auth.isAuthenticated &&
        !auth.activeNavigator &&
        !auth.isLoading
      ) {
        const oidcStorage = window.localStorage.getItem(
          `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
            "VITE_SAMS_CLIENT_ID"
          )}`
        );

        if (oidcStorage) {
          try {
            await auth.signinSilent();
          } catch (e) {
            console.log("Silent sign-in failed:", e);
            navigate("/login", { replace: true });
            return;
          }
        } else {
          navigate("/login", { replace: true });
          return;
        }
      }
    };

    initializeAuth();
  }, [auth, navigate]);

  return children;
}

export default AuthRetrieval;
