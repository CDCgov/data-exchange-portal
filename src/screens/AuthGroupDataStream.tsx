import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import { getDataStreams } from "src/utils/api/dataStreams";
import { getEntities } from "src/utils/api/entities";
import {
  getAuthGroups,
  assignAuthGroupToDataStream,
} from "src/utils/api/authGroups";
import { getRoutes } from "src/utils/api/routes";

function AuthGroupDataStream() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [entitiesList, setEntitiesList] = useState([]);

  const [authGroupsList, setAuthGroupsList] = useState([]);

  const [datastreamsList, setDatastreamsList] = useState([]);

  const [routesList, setRoutesList] = useState([]);

  const [selectedEntityName, setSelectedEntityName] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  const [selectedAuthGroupName, setSelectedAuthGroupName] = useState("");
  const [selectedAuthGroupId, setSelectedAuthGroupId] = useState("");

  const [selectedDatastreamName, setSelectedDatastreamName] = useState("");
  const [selectedDatastreamId, setSelectedDatastreamId] = useState("");

  const [selectedRouteName, setSelectedRouteName] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState("");

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  useEffect(() => {
    fetchEntities();
    fetchDataStreams();
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

  const fetchAuthGroups = async (entity_id: string) => {
    const res = await getAuthGroups(authToken, entity_id);
    const json = await res.json();
    setAuthGroupsList(json);
  };

  const fetchRoutes = async (datastream_id: number) => {
    const res = await getRoutes(authToken, datastream_id);
    const json = await res.json();
    setRoutesList(json);
  };

  const handleSetEntity = async (e: any) => {
    setSelectedEntityId(e.target.value);
    setSelectedEntityName(e.target.selectedOptions[0].text);
    await fetchAuthGroups(e.target.value);
  };

  const handleSetAuthGroup = (e: any) => {
    setSelectedAuthGroupId(e.target.value);
    setSelectedAuthGroupName(e.target.selectedOptions[0].text);
  };

  const handleSetDatastream = async (e: any) => {
    setSelectedDatastreamId(e.target.value);
    setSelectedDatastreamName(e.target.selectedOptions[0].text);
    await fetchRoutes(e.target.value);
  };

  const handleSetRoute = async (e: any) => {
    setSelectedRouteId(e.target.value);
    setSelectedRouteName(e.target.selectedOptions[0].text);
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

  const setAuthGroupDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select AuthGroup</option>
        {authGroupsList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const setDatastreamDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select Datastream</option>
        {datastreamsList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const setRoutesDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select Route</option>
        {routesList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const handleLinkAuthGroupToDatastream = async () => {
    console.log("selectedEntityId:", selectedEntityId);
    console.log("selectedEntityName:", selectedEntityName);
    console.log("selectedAuthGroupId:", selectedAuthGroupId);
    console.log("selectedAuthGroupName:", selectedAuthGroupName);
    console.log("selectedDatastreamId:", selectedDatastreamId);
    console.log("selectedDatastreamName:", selectedDatastreamName);
    console.log("selectedRoutesId:", selectedRouteId);
    console.log("selectedRoutesName:", selectedRouteName);
    const response = await assignAuthGroupToDataStream(
      authToken,
      +selectedAuthGroupId,
      +selectedRouteId
    );
    console.log(response);
    // Todo: replace this with the actual response
    setResponseMessage(response.statusText);
  };

  return (
    <>
      <h2 className="font-sans-lg">AuthGroup ↔ Datastream Assignment</h2>
      <div className="grid-row">
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
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="authgroup-dropdown">
            Select AuthGroup
          </label>
          <select
            className="usa-select"
            name="authgroup-dropdown"
            id="authgroup-dropdown"
            onChange={handleSetAuthGroup}>
            {setAuthGroupDropdownOptions()}
          </select>
        </div>
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="datastream-dropdown">
            Select Datastream
          </label>
          <select
            className="usa-select"
            name="datastream-dropdown"
            id="datastream-dropdown"
            onChange={handleSetDatastream}>
            {setDatastreamDropdownOptions()}
          </select>
        </div>
        <div className="grid-col flex-1">
          <label className="usa-label" htmlFor="options">
            Select Route
          </label>
          <select
            className="usa-select"
            name="options"
            id="options"
            onChange={handleSetRoute}>
            {setRoutesDropdownOptions()}
          </select>
        </div>
      </div>
      <div className="display-flex flex-align-center margin-top-4">
        <Button
          ariaLabel="Link AuthGroup to DataStream"
          onClick={handleLinkAuthGroupToDatastream}>
          Submit
        </Button>
        <div className="padding-left-2 font-mono-md">{responseMessage}</div>
      </div>
    </>
  );
}

export default AuthGroupDataStream;
