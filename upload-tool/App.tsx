import React, { ChangeEvent, useReducer } from "react";

import "@us-gov-cdc/cdc-react/dist/style.css";
import { Button, Divider, Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

function App() {
  const fileTypes = [".csv", ".hl7", ".txt"];

  const initialState = {
    fileName: "",
    environment: "",
    dataStream: "",
    route: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "updateField":
        return {
          ...state,
          [action.field]: action.payload,
        };
      default:
        throw new Error("Unrecognized action type provided to form reducer");
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

  const handleDataStreamSelect = (item) => {
    dispatch({
      type: "updateField",
      field: "dataStream",
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
    <>
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
        label="Select an Environment"
        srText="Select an Environment"
        items={[]}
        onSelect={(item) => handleEnvironmentSelect(item)}
      />
      <div className="grid-row flex-wrap flex-align-start">
        <div className="grid-col-3">
          <label className="usa-label" htmlFor="dataStream">
            Data Stream
          </label>
          <Dropdown
            id="dataStream"
            label="Data Stream"
            srText="Data Stream"
            items={[]}
            onSelect={(item) => handleDataStreamSelect(item)}
          />
        </div>
        <div className="grid-col-3">
          <label className="usa-label" htmlFor="route">
            Route
          </label>
          <Dropdown
            id="route"
            label="Select a Route"
            srText="Select a Route"
            items={[]}
            onSelect={(item) => handleRouteSelect(item)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
