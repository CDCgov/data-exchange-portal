import { useCallback, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import Select, { SelectOption } from "src/components/formFields/Select";

import { Button } from "@us-gov-cdc/cdc-react";

import { getDataStreams, DataStream } from "src/utils/api/dataStreams";
import { getEntities, Entity } from "src/utils/api/entities";
import {
  getAuthGroups,
  assignAuthGroupToDataStream,
  AuthGroup,
} from "src/utils/api/authGroups";
import { getRoutes, Route } from "src/utils/api/routes";

function AuthGroupDataStream() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [entitiesList, setEntitiesList] = useState([]);
  const [authGroupsList, setAuthGroupsList] = useState([]);
  const [datastreamsList, setDatastreamsList] = useState([]);
  const [routesList, setRoutesList] = useState([]);

  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [selectedAuthGroupId, setSelectedAuthGroupId] = useState("");
  const [selectedDatastreamId, setSelectedDatastreamId] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState("");

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  const fetchEntities = useCallback(async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setEntitiesList(json);
  }, [authToken]);

  const fetchDataStreams = useCallback(async () => {
    const res = await getDataStreams(authToken);
    const json = await res.json();
    setDatastreamsList(json);
  }, [authToken]);

  useEffect(() => {
    fetchEntities();
    fetchDataStreams();
  }, [fetchEntities, fetchDataStreams]);

  const fetchAuthGroups = async (entity_id: string) => {
    const res = await getAuthGroups(authToken, entity_id);
    const json = await res.json();
    setAuthGroupsList(json);
  };

  const fetchRoutes = async (datastream_id: string) => {
    const res = await getRoutes(authToken, datastream_id);
    const json = await res.json();
    setRoutesList(json);
  };

  const handleSetEntity = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEntityId(e.target.value);
    await fetchAuthGroups(e.target.value);
  };

  const handleSetAuthGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthGroupId(e.target.value);
  };

  const handleSetDatastream = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDatastreamId(e.target.value);
    await fetchRoutes(e.target.value);
  };

  const handleSetRoute = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouteId(e.target.value);
  };

  const entitiesOptions: SelectOption[] = entitiesList.map((e: Entity) => ({
    value: e.id,
    display: e.name,
  }));

  const authGroupOptions: SelectOption[] = authGroupsList.map(
    (g: AuthGroup) => ({
      value: g.id,
      display: g.name,
    })
  );

  const datastreamOptions: SelectOption[] = datastreamsList.map(
    (d: DataStream) => ({
      value: d.id,
      display: d.name,
    })
  );

  const routeOptions: SelectOption[] = routesList.map((r: Route) => ({
    value: r.id ?? 0,
    display: r.name,
  }));

  const handleLinkAuthGroupToDatastream = async () => {
    console.log("selectedEntityId:", selectedEntityId);
    console.log("selectedAuthGroupId:", selectedAuthGroupId);
    console.log("selectedDatastreamId:", selectedDatastreamId);
    console.log("selectedRoutesId:", selectedRouteId);
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
      <div className="grid-row margin-top-2">
        <Select
          className="grid-col flex-1 padding-right-2"
          id="entity-list-select"
          label="Select Entity"
          onChange={handleSetEntity}
          options={entitiesOptions}
        />
        <Select
          className="grid-col flex-1 padding-right-2"
          id="authgroup-list-select"
          label="Select Authgroup"
          onChange={handleSetAuthGroup}
          options={authGroupOptions}
        />
        <Select
          className="grid-col flex-1 padding-right-2"
          id="datastream-list-select"
          label="Select Datastream"
          onChange={handleSetDatastream}
          options={datastreamOptions}
        />
        <Select
          className="grid-col flex-1 padding-right-2"
          id="routes-list-select"
          label="Select Route"
          onChange={handleSetRoute}
          options={routeOptions}
        />
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
