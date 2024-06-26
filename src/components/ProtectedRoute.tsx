import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      navigate("/login", { replace: true });
    }
  }, [auth, navigate]);

  return children;
}

export default ProtectedRoute;
