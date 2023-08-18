import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    return auth.events.addUserLoaded(() => {
      navigate(from, { replace: true });
    });
  });

  return <></>;
}

export default Callback;
