import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import { getEntities } from "src/utils/api/entities";

function IdentityLookUp() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [entitiesList, setEntitiesList] = useState([]);

  const [selectedEntityName, setSelectedEntityName] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setEntitiesList(json);
  };

  const handleSetEntity = async (e: any) => {
    setSelectedEntityId(e.target.value);
    setSelectedEntityName(e.target.selectedOptions[0].text);
    // Todo: Fetch Entity Information
  };

  const setEntityDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select Entity</option>
        {entitiesList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  return (
    <>
      <h2 className="font-sans-lg">User LookUp</h2>
      <div className="grid-row margin-bottom-4">
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="entity-dropdown">
            Select Entity
          </label>
          <select
            className="usa-select"
            name="entity-dropdown"
            id="entity-dropdown"
            onChange={handleSetEntity}>
            {setEntityDropdownOptions()}
          </select>
        </div>
        <div className="grid-col"></div>
        <div className="grid-col"></div>
        <div className="grid-col"></div>
      </div>
      <div className="display-flex flex-align-center margin-y-4">
        <div className="grid-col flex-1 padding-2 border border-gray-5 radius-lg shadow-1 bg-white">
          <pre>
            {JSON.stringify({ entity: "put response here?" }, undefined, 2)}
          </pre>
        </div>
        <div className="grid-col"></div>
        <div className="grid-col"></div>
      </div>
    </>
  );
}

export default IdentityLookUp;
