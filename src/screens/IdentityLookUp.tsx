/* eslint-disable */
import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";
import { jsonPrettyPrint } from "src/utils/helperFunctions/json";

import {
  getIdentities,
  getIdentityDatastreamsAndRoutes,
} from "src/utils/api/identities";

function IdentityLookUp() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [identitiesList, setIdentitiesList] = useState([]);

  const [apiResponse, setApiResponse] = useState(
    "API response will display here"
  );

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  useEffect(() => {
    fetchIdentities();
  }, []);

  const fetchIdentities = async () => {
    const res = await getIdentities(authToken);
    const json = await res.json();
    setIdentitiesList(json);
  };

  const handleSetIdentities = async (e: any) => {
    const res = await getIdentityDatastreamsAndRoutes(
      authToken,
      e.target.value
    );
    const json = await res.json();
    setApiResponse(json);
  };

  const setIdentitiesDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select Identity</option>
        {identitiesList.map((item) => {
          return <option value={item.id}>{item.idpClientID}</option>;
        })}
      </Fragment>
    );
  };

  return (
    <>
      <h2 className="font-sans-lg">User LookUp</h2>
      <div className="grid-row margin-bottom-4">
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="identity-dropdown">
            Select Identity
          </label>
          <select
            className="usa-select"
            name="identity-dropdown"
            id="identity-dropdown"
            onChange={handleSetIdentities}>
            {setIdentitiesDropdownOptions()}
          </select>
        </div>
        <div className="grid-col"></div>
        <div className="grid-col"></div>
        <div className="grid-col"></div>
      </div>
      <div className="display-flex flex-align-center margin-y-4">
        <div className="grid-col flex-1 padding-2 border border-gray-5 radius-lg shadow-1 bg-white">
          <pre>{jsonPrettyPrint(apiResponse)}</pre>
        </div>
        <div className="grid-col"></div>
      </div>
    </>
  );
}

export default IdentityLookUp;
