import React, { ChangeEvent, useReducer, useState, useEffect } from "react";

import "@us-gov-cdc/cdc-react/dist/style.css";
import { Button, Divider, Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { DragDrop, FileInput } from "@uppy/react";

import "@uppy/core/dist/style.min.css";

function App() {
  const fileTypes = [".csv", ".hl7", ".txt"];

  const initialState = {
    filename: "",
    environment: "",
    data_stream: "",
    route: "",
    filetype: "",
    meta_username: "",
    meta_ext_filestatus: "",
    meta_program: "",
    meta_ext_source: "",
    meta_organization: "",
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

  // This useEffect is to help with development
  useEffect(() => {
    console.log("formState:", formState);
  }, [formState]);

  const handleFileSelection = () => {
    document?.getElementById("file-uploader")?.click();
  };

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch({
        type: "updateField",
        field: "filename",
        payload: e.target.files[0].name,
      });
    }
  };

  const handleUpload = () => {
    console.log("no upload capability yet");
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
      field: "data_stream",
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

  const [uppy] = useState(() =>
    new Uppy({ id: "uppy1", autoProceed: false, debug: true }).use(Tus, {
      endpoint: "https://tusd.tusdemo.net/files/",
    })
  );

  return (
    <>
      <div className="grid-container">
        <h1>File Upload</h1>
        <div className="display-flex flex-row flex-justify-start flex-align-center">
          <div className="margin-right-2">
            <DragDrop
              uppy={uppy}
              locale={{
                strings: {
                  dropHereOr: "Choose a file",
                },
              }}
            />
            {/* <Button
              uppy={uppy}

              id="choose-file"
              ariaLabel="Choose a file"
              icon={<Icons.Folder />}
              iconPosition="left"
              size="big"
              onClick={handleFileSelection}>
              Choose a file
            </Button>
            <input
              type="file"
              id="file-uploader"
              name="file-uploader"
              accept={fileTypes.toString()}
              multiple
              onChange={(e) => handleFileNameChange(e)}

            /> */}
          </div>
          <p id="file-name" className="text-italic text-normal">
            {formState.filename ? formState.filename : "No file chosen"}
          </p>
        </div>
        <p className="text-italic text-normal">
          Accepted file types include .csv, .hl7, .txt{" "}
          <span className="text-no-italic margin-x-105">|</span>Limited to 1
          file per upload
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
            <label className="usa-label" htmlFor="data_stream">
              Data Stream
            </label>
            <Dropdown
              id="data_stream"
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
        <h2 className="font-sans-lg margin-top-5 margin-bottom--2">
          Additional Metadata
        </h2>
        <label className="usa-label" htmlFor="filetype">
          filetype
        </label>
        <input
          className="usa-input"
          id="filetype"
          name="filetype"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "filetype",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="meta_username">
          meta_username
        </label>
        <input
          className="usa-input"
          id="meta_username"
          name="meta_username"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "meta_username",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="meta_ext_filestatus">
          meta_ext_filestatus
        </label>
        <input
          className="usa-input"
          id="meta_ext_filestatus"
          name="meta_ext_filestatus"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "meta_ext_filestatus",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="meta_program">
          meta_program
        </label>
        <input
          className="usa-input"
          id="meta_program"
          name="meta_program"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "meta_program",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="meta_ext_source">
          meta_ext_source
        </label>
        <input
          className="usa-input"
          id="meta_ext_source"
          name="meta_ext_source"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "meta_ext_source",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="meta_organization">
          meta_organization
        </label>
        <input
          className="usa-input"
          id="meta_organization"
          name="meta_organization"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "meta_organization",
              payload: e.target.value,
            });
          }}
        />

        <Button
          className="margin-y-4"
          id="upload-button"
          ariaLabel="Upload"
          size="big"
          onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </>
  );
}

export default App;
