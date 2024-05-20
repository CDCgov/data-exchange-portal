import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";
import jsonPrettyPrint from "src/utils/helperFunctions/jsonPrettyPrint";

import { getDataStreams, createDataStream } from "src/utils/api/dataStreams";
import { getEntities, createEntity } from "src/utils/api/entities";
import { getManifests, createManifest } from "src/utils/api/manifests";
import { getPrograms, createProgram } from "src/utils/api/programs";
import { getRoutes, createRoute } from "src/utils/api/routes";

function MetadataManagement() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  const [entityName, setEntityName] = useState("");
  const [entityId, setEntityId] = useState("");

  const [programName, setProgramName] = useState("");
  const [programId, setProgramId] = useState("");

  const [datastreamName, setDatastreamName] = useState("");
  const [datastreamId, setDatastreamId] = useState("");

  const [routeName, setRouteName] = useState("");
  const [routeId, setRouteId] = useState("");

  const [manifestJson, setManifestJson] = useState("");

  const [apiResponse, setApiResponse] = useState("example api response");

  // Entities
  const handleGetEntities = async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateEntity = async () => {
    const res = await createEntity(authToken, entityName);

    if (res.status != 200) {
      setApiResponse("Bad request: entity name is required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  // Programs
  const handleGetPrograms = async () => {
    const res = await getPrograms(authToken, parseInt(entityId));

    if (res.status != 200) {
      setApiResponse("Bad request: entity id is required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateProgram = async () => {
    const res = await createProgram(authToken, parseInt(entityId), programName);

    if (res.status != 200) {
      setApiResponse("Bad request: entity id and program name are required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  // Datastreams
  const handleGetDatastreams = async () => {
    const res = await getDataStreams(authToken);
    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateDatastream = async () => {
    const res = await createDataStream(
      authToken,
      datastreamName,
      parseInt(programId)
    );

    if (res.status != 200) {
      setApiResponse(
        "Bad request: programId id and datastream name are required"
      );
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  // Routes
  const handleGetRoutes = async () => {
    const res = await getRoutes(authToken, parseInt(datastreamId));

    if (res.status != 200) {
      setApiResponse("Bad request: datastream id is required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateRoute = async () => {
    const res = await createRoute(authToken, parseInt(datastreamId), routeName);

    if (res.status != 200) {
      setApiResponse("Bad request: datastream id and route name are required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  // Manifests
  const handleGetManifest = async () => {
    const res = await getManifests(
      authToken,
      parseInt(datastreamId),
      parseInt(routeId)
    );

    if (res.status != 200) {
      setApiResponse("Bad request: datastream id and route id are required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateManifest = async () => {
    const res = await createManifest(
      authToken,
      parseInt(datastreamId),
      parseInt(routeId),
      manifestJson
    );

    if (res.status != 200) {
      setApiResponse(
        "Bad request: datastream id, route id, and manifestJson are required"
      );
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">
        Metadata Management
      </h1>
      <div className="display-flex flex-justify-start">
        <div className="width-tablet">
          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="entity_name">
              Entity Name
            </label>
            <input
              className="usa-input"
              value={entityName}
              id="entity_name"
              name="entity_name"
              onChange={(e) => setEntityName(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Entity" onClick={handleCreateEntity}>
                Create Entity
              </Button>
              <Button ariaLabel="Get Entities" onClick={handleGetEntities}>
                Get Entities
              </Button>
            </div>
          </div>

          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="entity_id">
              Entity ID
            </label>
            <input
              className="usa-input"
              value={entityId}
              type="number"
              id="entity_id"
              name="entity_id"
              onChange={(e) => setEntityId(e.target.value)}
            />
            <label className="usa-label" htmlFor="program_name">
              Program Name
            </label>
            <input
              className="usa-input"
              value={programName}
              id="program_name"
              name="program_name"
              onChange={(e) => setProgramName(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Program" onClick={handleCreateProgram}>
                Create Program
              </Button>
              <Button ariaLabel="Get Programs" onClick={handleGetPrograms}>
                Get Programs
              </Button>
            </div>
          </div>

          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="program_id">
              Program ID
            </label>
            <input
              className="usa-input"
              value={programId}
              id="program_id"
              type="number"
              name="program_id"
              onChange={(e) => setProgramId(e.target.value)}
            />
            <label className="usa-label" htmlFor="datastream_name">
              Datastream Name
            </label>
            <input
              className="usa-input"
              value={datastreamName}
              id="datastream_name"
              name="datastream_name"
              onChange={(e) => setDatastreamName(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button
                ariaLabel="Create Datastream"
                onClick={handleCreateDatastream}>
                Create Datastream
              </Button>
              <Button
                ariaLabel="Get Datastreams"
                onClick={handleGetDatastreams}>
                Get Datastreams
              </Button>
            </div>
          </div>

          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="datastream_id">
              Datastream ID
            </label>
            <input
              className="usa-input"
              value={datastreamId}
              id="datastream_id"
              type="number"
              name="datastream_id"
              onChange={(e) => setDatastreamId(e.target.value)}
            />
            <label className="usa-label" htmlFor="route_name">
              Route Name
            </label>
            <input
              className="usa-input"
              value={routeName}
              id="route_name"
              name="route_name"
              onChange={(e) => setRouteName(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Route" onClick={handleCreateRoute}>
                Create Route
              </Button>
              <Button ariaLabel="Get Routes" onClick={handleGetRoutes}>
                Get Routes
              </Button>
            </div>
          </div>

          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="datastream_id">
              Datastream ID
            </label>
            <input
              className="usa-input"
              value={datastreamId}
              type="number"
              id="datastream_id"
              name="datastream_id"
              onChange={(e) => setDatastreamId(e.target.value)}
            />
            <label className="usa-label" htmlFor="route_id">
              Route ID
            </label>
            <input
              className="usa-input"
              value={routeId}
              type="number"
              id="route_id"
              name="route_id"
              onChange={(e) => setRouteId(e.target.value)}
            />
            <label className="usa-label" htmlFor="manifest_json">
              Manifest JSON
            </label>
            <textarea
              className="usa-textarea"
              value={manifestJson}
              id="manifest_json"
              name="manifest_json"
              onChange={(e) => setManifestJson(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button
                ariaLabel="Create Manifest"
                onClick={handleCreateManifest}>
                Create Manifest
              </Button>
              <Button ariaLabel="Get Manifests" onClick={handleGetManifest}>
                Get Manifests
              </Button>
            </div>
          </div>
        </div>
        <div className="width-full margin-4 overflow-auto">
          <p className="margin-bottom-2">Api Response</p>
          <p className="height-full width-full border radius-md padding-2">
            {jsonPrettyPrint(apiResponse)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MetadataManagement;
