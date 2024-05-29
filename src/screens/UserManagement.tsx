import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { Button, Dropdown } from "@us-gov-cdc/cdc-react";

function UserManagement() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">User Management</h1>
    </section>
  );
}

export default UserManagement;
