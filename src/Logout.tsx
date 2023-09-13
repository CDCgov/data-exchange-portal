import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// The main purpose of this component is to handle the redirect from SAMS and register an event handler
// for when the user profile has been successfuly populated.
function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  // In case the user tried to access a page directly.
  const from = "/";

  useEffect(() => {
    sessionStorage.clear();
    navigate(from, { replace: true });
  }, [auth.events, from, navigate]);

  return <></>; // Can possibly add a loading message here in the future.
}

export default Logout;
