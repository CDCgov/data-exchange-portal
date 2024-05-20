import { Button } from "@us-gov-cdc/cdc-react";

function MetadataManagement() {
  const handleCreateEntity = () => {
    console.log("entity name");
  };
  const handleCreateProgram = () => {
    console.log("entity name");
  };
  const handleCreateDatastream = () => {
    console.log("entity name");
  };
  const handleCreateRoute = () => {
    console.log("entity name");
  };
  const handleCreateManifest = () => {
    console.log("entity name");
  };

  const handleGetEntity = () => {
    console.log("entity name");
  };
  const handleGetProgram = () => {
    console.log("entity name");
  };
  const handleGetDatastream = () => {
    console.log("entity name");
  };
  const handleGetRoute = () => {
    console.log("entity name");
  };
  const handleGetManifest = () => {
    console.log("entity name");
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
              id="entity_name"
              name="entity_name"
              onChange={() => {}}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Entity" onClick={handleCreateEntity}>
                Create Entity
              </Button>
              <Button ariaLabel="Get Entities" onClick={handleGetEntity}>
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
              id="entity_id"
              name="entity_id"
              onChange={() => {}}
            />
            <label className="usa-label" htmlFor="program_name">
              Program Name
            </label>
            <input
              className="usa-input"
              id="program_name"
              name="program_name"
              onChange={() => {}}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Program" onClick={handleCreateProgram}>
                Create Program
              </Button>
              <Button ariaLabel="Get Programs" onClick={handleGetProgram}>
                Get Programs
              </Button>
            </div>
          </div>

          <div className="margin-bottom-8">
            <label className="usa-label" htmlFor="datastream_name">
              Datastream Name
            </label>
            <input
              className="usa-input"
              id="datastream_name"
              name="datastream_name"
              onChange={() => {}}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button
                ariaLabel="Create Datastream"
                onClick={handleCreateDatastream}>
                Create Datastream
              </Button>
              <Button ariaLabel="Get Datastreams" onClick={handleGetDatastream}>
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
              id="datastream_id"
              name="datastream_id"
              onChange={() => {}}
            />
            <label className="usa-label" htmlFor="route_name">
              Route Name
            </label>
            <input
              className="usa-input"
              id="route_name"
              name="route_name"
              onChange={() => {}}
            />
            <div className="margin-top-2 display-flex flex-justify">
              <Button ariaLabel="Create Route" onClick={handleCreateRoute}>
                Create Route
              </Button>
              <Button ariaLabel="Get Routes" onClick={handleGetRoute}>
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
              id="datastream_id"
              name="datastream_id"
              onChange={() => {}}
            />
            <label className="usa-label" htmlFor="route_id">
              Route ID
            </label>
            <input
              className="usa-input"
              id="route_id"
              name="route_id"
              onChange={() => {}}
            />
            <label className="usa-label" htmlFor="manifest_json">
              Manifest JSON
            </label>
            <textarea
              className="usa-textarea"
              id="manifest_json"
              name="manifest_json"
              onChange={() => {}}
            />
            <div className="display-flex flex-justify">
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
        <div className="width-full margin-4">
          <h5 className="margin-bottom-2">Api Response</h5>
          <div className="height-full width-full border radius-md padding-2">
            testing 123
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetadataManagement;
