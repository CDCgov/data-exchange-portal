import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import { getDataStreams, createDataStream } from "src/utils/api/dataStreams";
import { getEntities, createEntity } from "src/utils/api/entities";
import { getAuthGroups, createAuthGroups } from "src/utils/api/authGroups";
import { getRoutes } from "src/utils/api/routes";

function AuthGroupDataStream() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [entitiesList, setEntitiesList] = useState([
    { id: 1, name: "error fetching entities" },
  ]);

  const [datastreamsList, setDatastreamsList] = useState([
    { id: 1, name: "error fetching datastreams" },
  ]);

  const [selectedEntityName, setSelectedEntityName] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  const [selectedDatastreamName, setSelectedDatastreamName] = useState("");
  const [selectedDatastreamId, setSelectedDatastreamId] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  useEffect(() => {
    fetchEntities();
    fetchDataStreams();
    //fetchIdentities();
  }, []);

  const fetchEntities = async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setEntitiesList(json);
  };

  const fetchDataStreams = async () => {
    const res = await getDataStreams(authToken);
    const json = await res.json();
    setDatastreamsList(json);
  };

  const handleSetEntity = (e: any) => {
    setSelectedEntityId(e.target.value);
    setSelectedEntityName(e.target.selectedOptions[0].text);
    // Todo: Fetch AuthGroups with selected entityId
  };

  const handleSetDatastream = (e: any) => {
    setSelectedDatastreamId(e.target.value);
    setSelectedDatastreamName(e.target.selectedOptions[0].text);
    // Todo: Fetch Routes with selected datastreamId
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

  const setDatastreamDropdownOptions = () => {
    return (
      <Fragment>
        {datastreamsList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const handleLinkAuthGroup = () => {
    console.log("selectedEntityId:", selectedEntityId);
    console.log("selectedEntityName:", selectedEntityName);
    console.log("selectedDatastreamId:", selectedDatastreamId);
    console.log("selectedDatastreamName:", selectedDatastreamName);
  };

  return (
    <>
      <h2 className="font-sans-lg">AuthGroup ↔ Datastream Assignment</h2>
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
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="options">
            Select AuthGroup
          </label>
          <select className="usa-select" name="options" id="options">
            <option value="value1">Option A</option>
            <option value="value2">Option B</option>
            <option value="value3">Option C</option>
          </select>
        </div>
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="options">
            Select Datastream
          </label>
          <select
            className="usa-select"
            name="options"
            id="options"
            onChange={handleSetDatastream}>
            {setDatastreamDropdownOptions()}
          </select>
        </div>
        <div className="grid-col flex-1">
          <label className="usa-label" htmlFor="options">
            Select Route
          </label>
          <select className="usa-select" name="options" id="options">
            <option value="value1">Option A</option>
            <option value="value2">Option B</option>
            <option value="value3">Option C</option>
          </select>
        </div>
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

export default AuthGroupDataStream;
