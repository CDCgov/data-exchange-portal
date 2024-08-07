import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";
import Select, { SelectOption } from "src/components/formFields/Select";

import { jsonPrettyPrint } from "src/utils/helperFunctions/json";

import { getDataStreams, createDataStream } from "src/utils/api/dataStreams";
import { getEntities, createEntity } from "src/utils/api/entities";
import { getManifests, createManifest } from "src/utils/api/manifests";
import { getPrograms, createProgram } from "src/utils/api/programs";
import { getRoutes, createRoute } from "src/utils/api/routes";
import { getAuthGroups, createAuthGroup } from "src/utils/api/authGroups";
import { getIdentities, createIdentity } from "src/utils/api/identities";

function MetadataManagement() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const formTypes: SelectOption[] = [
    { value: "Entities", display: "Entities" },
    { value: "Programs", display: "Programs" },
    { value: "Datastreams", display: "Datastreams" },
    { value: "Routes", display: "Routes" },
    { value: "Manifests", display: "Manifests" },
    { value: "AuthGroups", display: "AuthGroups" },
    { value: "Identities", display: "Identities" },
  ];

  const [formType, setFormType] = useState(formTypes[0]);

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  const [entityName, setEntityName] = useState("");
  const [entityId, setEntityId] = useState("");

  const [programName, setProgramName] = useState("");

  const [datastreamName, setDatastreamName] = useState("");
  const [datastreamId, setDatastreamId] = useState("");

  const [routeName, setRouteName] = useState("");

  const [manifestJson, setManifestJson] = useState("");

  const [authGroupName, setAuthGroupName] = useState("");

  const [identityClientID, setIdentityClientID] = useState("");

  const [apiResponse, setApiResponse] = useState(
    "API response will display here"
  );

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
    const res = await createDataStream(authToken, datastreamName);

    if (res.status != 200) {
      setApiResponse("Bad request: datastream name is required");
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
    const res = await getManifests(authToken, datastreamName, routeName);

    if (res.status != 200) {
      setApiResponse(
        "Bad request: datastream name and route name are required"
      );
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateManifest = async () => {
    const manifestObject = JSON.parse(manifestJson);
    const res = await createManifest(
      authToken,
      datastreamName,
      routeName,
      manifestObject
    );

    if (res.status != 200) {
      setApiResponse(
        "Bad request: datastream name, route name, and config are required"
      );
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  // Authgroups
  const handleGetAuthGroups = async () => {
    const res = await getAuthGroups(authToken, entityId);

    if (res.status != 200) {
      setApiResponse("Bad request: entityId is required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateAuthGroup = async () => {
    const res = await createAuthGroup(authToken, entityId, authGroupName);

    if (res.status != 200) {
      setApiResponse("Bad request: entityId and authGroupName are required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  // Identities
  const handleGetIdentities = async () => {
    const res = await getIdentities(authToken);
    const json = await res.json();
    setApiResponse(json);
  };
  const handleCreateIdentity = async () => {
    const res = await createIdentity(authToken, identityClientID);

    if (res.status != 200) {
      setApiResponse("Bad request: idenenty client_id is required");
      return;
    }

    const json = await res.json();
    setApiResponse(json);
  };

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType({ value: e.target.value, display: e.target.value });
  };

  const renderFormType = () => {
    switch (formType.value) {
      case "Entities":
        return (
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
        );
      case "Programs":
        return (
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
        );
      case "Datastreams":
        return (
          <div className="margin-bottom-8">
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
        );
      case "Routes":
        return (
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
        );
      case "Manifests":
        return (
          <div className="margin-bottom-8">
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
            <label className="usa-label" htmlFor="config_json">
              Config JSON
            </label>
            <textarea
              className="usa-textarea"
              value={manifestJson}
              id="config_json"
              name="config_json"
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
        );
      case "AuthGroups":
        return (
          <div className="margin-bottom-8">
            {/* Todo: Fetch this list instead of it being an input value */}
            <label className="usa-label" htmlFor="authgroup_name">
              EntityID
            </label>
            <input
              className="usa-input"
              value={entityId}
              id="entity_id"
              name="entity_id"
              onChange={(e) => setEntityId(e.target.value)}
            />
            <label className="usa-label" htmlFor="authgroup_name">
              AuthGroup Name
            </label>
            <input
              className="usa-input"
              value={authGroupName}
              id="authgroup_name"
              name="authgroup_name"
              onChange={(e) => setAuthGroupName(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Entity" onClick={handleCreateAuthGroup}>
                Create AuthGroup
              </Button>
              <Button ariaLabel="Get Entities" onClick={handleGetAuthGroups}>
                Get AuthGroups
              </Button>
            </div>
          </div>
        );
      case "Identities":
        return (
          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="identity_client_id">
              Identity Client ID
            </label>
            <input
              className="usa-input"
              value={identityClientID}
              id="identity_client_id"
              name="identity_client_id"
              onChange={(e) => setIdentityClientID(e.target.value)}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Entity" onClick={handleCreateIdentity}>
                Create Identity
              </Button>
              <Button ariaLabel="Get Entities" onClick={handleGetIdentities}>
                Get Identities
              </Button>
            </div>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">
        Metadata Management
      </h1>
      <Select
        className="padding-right-2"
        id="data-route-filter"
        label="Meta Data Object"
        onChange={handleFormTypeChange}
        options={formTypes}
      />
      <div className="display-flex flex-justify-start">
        <div className="width-mobile-lg">{renderFormType()}</div>
        <div className="width-tablet-lg margin-left-6 overflow-auto minh-mobile-lg border radius-md padding-2">
          {jsonPrettyPrint(apiResponse)}
        </div>
      </div>
    </section>
  );
}

export default MetadataManagement;
