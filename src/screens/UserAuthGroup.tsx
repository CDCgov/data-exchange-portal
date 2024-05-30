import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import { getEntities, createEntity } from "src/utils/api/entities";
import { getAuthGroups, createAuthGroups } from "src/utils/api/authGroups";

function UserAuthGroup() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [entitiesList, setEntitiesList] = useState([
    { id: 1, name: "error fetching entities" },
  ]);

  const [selectedEntityName, setSelectedEntityName] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  useEffect(() => {
    //fetchIdentities();
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setEntitiesList(json);
  };

  const handleSetEntity = (e: any) => {
    setSelectedEntityId(e.target.value);
    setSelectedEntityName(e.target.selectedOptions[0].text);
    // Todo: Fetch AuthGroups with selected entityId
  };

  const handleLinkUserToAuthGroup = () => {
    // console.log("selectedUserId:", selectedUserId);
    console.log("selectedEntityId:", selectedEntityId);
    console.log("selectedEntityName:", selectedEntityName);
  };

  const setEntityDropdownOptions = () => {
    return (
      <Fragment>
        {entitiesList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  return (
    <>
      <h2 className="font-sans-lg">User ↔ AuthGroup Assignment</h2>
      <div className="grid-row">
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="options">
            Select User (Identity)
          </label>
          <select className="usa-select" name="options" id="options">
            <option value="value1">Option A</option>
            <option value="value2">Option B</option>
            <option value="value3">Option C</option>
          </select>
        </div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
      </div>
      <div className="grid-row">
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="options">
            Select Entity
          </label>
          <select
            className="usa-select"
            name="options"
            id="options"
            onChange={handleSetEntity}>
            {setEntityDropdownOptions()}
          </select>
        </div>

        <div className="grid-col flex-1">
          <label className="usa-label" htmlFor="options">
            Select AuthGroup
          </label>
          <select className="usa-select" name="options" id="options">
            <option value="value1">Option A</option>
            <option value="value2">Option B</option>
            <option value="value3">Option C</option>
          </select>
        </div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
      </div>
      <Button
        className="margin-top-4"
        ariaLabel="Link AuthGroup to DataStream"
        onClick={handleLinkUserToAuthGroup}>
        Submit
      </Button>
    </>
  );
}

export default UserAuthGroup;
