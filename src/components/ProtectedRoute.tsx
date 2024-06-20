import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";
import { getOIDCTokenDetails } from "src/utils/helperFunctions/auth";

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const expires_in = auth.user?.expires_in ?? 0;

    if (!auth.isAuthenticated || expires_in <= 0) {
      const tokenDetails = getOIDCTokenDetails();

      if (!tokenDetails || tokenDetails.expireTime < Date.now()) {
        navigate("/login", { replace: true });
        return;
      }

      auth.signinSilent()?.catch(() => navigate("/login", { replace: true }));
    }
  }, [auth, location, navigate]);

  return children;
}

export default ProtectedRoute;
