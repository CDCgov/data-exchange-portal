import React, { ChangeEvent, useReducer } from "react";

import "@us-gov-cdc/cdc-react/dist/style.css";
import { Button, Divider, Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

function App() {
  const fileTypes = [".csv", ".hl7", ".txt"];

  const initialState = {
    fileName: "",
    environment: "",
    dataStream: "aims-celr",
    route: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "updateField":
        return {
          ...state,
          [action.field]: action.payload,
        };
    }
  }

  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleFileUpload = () => {
    document?.getElementById("file-uploader")?.click();
  };

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch({
        type: "updateField",
        field: "fileName",
        payload: e.target.files[0].name,
      });
    }
  };

  const handleEnvironmentSelect = (item) => {
    dispatch({
      type: "updateField",
      field: "environment",
      payload: item,
    });
  };

  const handleRouteSelect = (item) => {
    dispatch({
      type: "updateField",
      field: "route",
      payload: item,
    });
  };

  return (
    <React.Fragment>
      <h1>File Upload</h1>
      <div className="display-flex flex-row flex-justify-start flex-align-center">
        <div className="margin-right-2">
          <Button
            id="upload-button"
            ariaLabel="Choose a file"
            icon={<Icons.Folder />}
            iconPosition="left"
            size="big"
            onClick={handleFileUpload}>
            Choose a file
          </Button>
          <input
            type="file"
            id="file-uploader"
            name="file-uploader"
            accept={fileTypes.toString()}
            multiple
            onChange={(e) => handleFileNameChange(e)}
          />
        </div>
        <p id="file-name" className="text-italic text-normal">
          {formState.fileName ? formState.fileName : "No file chosen"}
        </p>
      </div>
      <p className="text-italic text-normal">
        Accepted file types include .csv, .hl7, .txt{" "}
        <span className="text-no-italic margin-x-105">|</span>Limited to 1 file
        per upload
      </p>
      <Divider height={2} stroke="#000" width={1000} />
      <label className="usa-label" htmlFor="environment">
        Environment
      </label>
      <Dropdown
        id="environment"
        items={["Staging", "Development"]}
        label="Select an Environment"
        onSelect={(item) => handleEnvironmentSelect(item)}
        srText="Select an Environment"
      />

      {/* <form className="usa-form">
        <label className="usa-label" htmlFor="options">
          Dropdown label
        </label>
        <select className="usa-select" name="options" id="options">
          <option>- Select -</option>
          <option value="value1">Option A</option>
          <option value="value2">Option B</option>
          <option value="value3">Option C</option>
        </select>
      </form> */}

      <label className="usa-label" htmlFor="dataStream">
        Data Stream
      </label>
      <Dropdown
        id="dataStream"
        label="Data Stream"
        srText="Data Stream"
        items={["aims-celr"]}
        onSelect={() => {}}
      />

      <label className="usa-label" htmlFor="route">
        Route
      </label>
      <Dropdown
        id="route"
        items={["csv", "hl7"]}
        label="Select a Route"
        onSelect={(item) => handleRouteSelect(item)}
        srText="Select a Route"
      />
    </React.Fragment>
  );
}

export default App;
