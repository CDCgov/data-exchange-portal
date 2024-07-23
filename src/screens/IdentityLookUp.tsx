import { useCallback, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { jsonPrettyPrint } from "src/utils/helperFunctions/json";
import Select, { SelectOption } from "src/components/formFields/Select";

import { getIdentities, Identity } from "src/utils/api/identities";

function IdentityLookUp() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [identitiesList, setIdentitiesList] = useState([]);

  const [apiResponse, _] = useState("API response will display here");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  const fetchIdentities = useCallback(async () => {
    const res = await getIdentities(authToken);
    const json = await res.json();
    setIdentitiesList(json);
  }, [authToken]);

  useEffect(() => {
    fetchIdentities();
  }, [fetchIdentities]);

  const handleSetIdentities = async (
    _: React.ChangeEvent<HTMLSelectElement>
  ) => {};

  const identitiesOptions: SelectOption[] = identitiesList.map(
    (i: Identity) => ({
      value: i.id,
      display: i.idpClientID,
    })
  );

  return (
    <>
      <h2 className="font-sans-lg">User LookUp</h2>
      <div className="grid-row margin-top-2 margin-bottom-4">
        <Select
          className="grid-col flex-1 padding-right-2"
          id="identity-list-select"
          label="Select Identity"
          onChange={handleSetIdentities}
          options={identitiesOptions}
        />
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
