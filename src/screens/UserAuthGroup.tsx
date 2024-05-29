import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";

import { Button, Dropdown } from "@us-gov-cdc/cdc-react";

import { getDataStreams, createDataStream } from "src/utils/api/dataStreams";
import { getEntities, createEntity } from "src/utils/api/entities";
import { getManifests, createManifest } from "src/utils/api/manifests";
import { getPrograms, createProgram } from "src/utils/api/programs";
import { getRoutes, createRoute } from "src/utils/api/routes";
import { getAuthGroups, createAuthGroups } from "src/utils/api/authGroups";

function UserAuthGroup() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [entitiesList, setEntitiesList] = useState(["jhu", "fearless"]);

  const [entityName, setEntityName] = useState("");
  const [entityId, setEntityId] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  const handleLinkAuthGroup = () => {
    console.log("hit handleLinkAuthGroup");
  };

  const handleSetEntityDatastream = (e: any) => {
    console.log(e.target.value);
  };

  const setEntityDropdownOptions = () => {
    return (
      <Fragment>
        {entitiesList.map((item) => {
          return <option value={item}>{item}</option>;
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
          <select className="usa-select" name="options" id="options">
            <option value="value1">Option A</option>
            <option value="value2">Option B</option>
            <option value="value3">Option C</option>
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
        onClick={handleLinkAuthGroup}>
        Submit
      </Button>
    </>
  );
}

export default UserAuthGroup;
