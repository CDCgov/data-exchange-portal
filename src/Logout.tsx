import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// The main purpose of this component is to handle the deauthication
function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const from = "/";

  useEffect(() => {
    auth.removeUser();
    navigate(from, { replace: true });
  }, [auth, from, navigate]);

  return <></>; // Can possibly add a loading message here in the future.
}

export default Logout;
