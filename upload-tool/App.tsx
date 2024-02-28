import { ChangeEvent, useReducer, useState, useEffect } from "react";

import "@us-gov-cdc/cdc-react/dist/style.css";
import { Button, Divider, Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

import * as tus from "tus-js-client";

import { getEnv } from "../src/utils";

const DestionationsAndEvents: { [key: string]: Array<string> } = {
  "aims-celr": ["csv", "hl7"],
  daart: ["hl7"],
};

function App() {
  const fileTypes = [".csv", ".hl7", ".txt"];

  const initialState = {
    file: {},
    filename: "",
    environment: "",
    destination: "",
    event: "",
    filetype: "",
    meta_username: "",
    meta_ext_filestatus: "",
    meta_ext_filename: "",
    meta_program: "",
    meta_ext_source: "",
    meta_organization: "",
    message_type: "",
    route: "",
    reporting_jurisdiction: "",
    system_provider: "",
    original_file_name: "",
    original_file_timestamp: "",
    meta_ext_file_timestamp: "",
    meta_file_timestamp: "",
    orig_filename: "",
  };

  const [uploadFeedback, setUploadFeedback] = useState<Array<string>>(["", ""]);
  const [eventItems, setEventItems] = useState<Array<string>>([]);

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
        field: "file",
        payload: e.target.files[0],
      });
      dispatch({
        type: "updateField",
        field: "filename",
        payload: e.target.files[0].name,
      });
    }
  };

  const handleUpload = () => {
    const timestamp: string = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");

    const upload = new tus.Upload(formState.file, {
      endpoint: getEnv("VITE_UPLOAD_API_ENDPOINT"),
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: formState.filename,
        filetype: formState.filetype,
        meta_destination_id: formState.destination,
        meta_ext_event: formState.event,
        meta_username: formState.meta_username,
        meta_ext_filestatus: formState.meta_ext_filestatus,
        meta_ext_filename: formState.filename,
        meta_ext_file_timestamp: timestamp,
        meta_file_timestamp: timestamp,
        meta_program: formState.meta_program,
        meta_ext_source: formState.meta_ext_source,
        meta_organization: formState.meta_organization,
        original_file_timestamp: timestamp,
        message_type: formState.message_type,
        route: formState.route,
        reporting_jurisdiction: formState.reporting_jurisdiction,
        system_provider: formState.system_provider,
        orig_filename: formState.filename,
        original_file_name: formState.filename,
      },
      onError: function (error) {
        console.log("Failed because: " + error);
        setUploadFeedback([`Upload failed: ${error.message}`, "error"]);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setUploadFeedback([`Uploading: ${percentage}%`, "info"]);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        setUploadFeedback([
          `Upload successful: ${upload.file.name}`,
          "success",
        ]);
      },
    });

    upload.start();
  };

  return (
    <>
      <div className="grid-container">
        <h1>File Upload</h1>
        <div className="display-flex flex-row flex-justify-start flex-align-center">
          <div className="margin-right-2">
            <Button
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
            />
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
          items={["Test"]}
          onSelect={(item) => {
            dispatch({
              type: "updateField",
              field: "environment",
              payload: item,
            });
          }}
        />
        <div className="grid-row flex-wrap flex-align-start">
          <div className="grid-col-4">
            <label className="usa-label" htmlFor="destination">
              Destination
            </label>
            <Dropdown
              id="destination"
              label="Destination"
              srText="Destination"
              items={Object.keys(DestionationsAndEvents)}
              onSelect={(item) => {
                dispatch({
                  type: "updateField",
                  field: "destination",
                  payload: item,
                });

                setEventItems(DestionationsAndEvents[item]);
              }}
            />
          </div>
          <div className="grid-col-4">
            <label className="usa-label" htmlFor="event">
              Event
            </label>
            <Dropdown
              id="event"
              label="Select Event"
              srText="Select Event"
              items={eventItems}
              onSelect={(item) => {
                dispatch({
                  type: "updateField",
                  field: "event",
                  payload: item,
                });
              }}
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
        <label className="usa-label" htmlFor="message_type">
          message_type
        </label>
        <input
          className="usa-input"
          id="message_type"
          name="message_type"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "message_type",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="route">
          route
        </label>
        <input
          className="usa-input"
          id="route"
          name="route"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "route",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="reporting_jurisdiction">
          reporting_jurisdiction
        </label>
        <input
          className="usa-input"
          id="reporting_jurisdiction"
          name="reporting_jurisdiction"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "reporting_jurisdiction",
              payload: e.target.value,
            });
          }}
        />
        <label className="usa-label" htmlFor="system_provider">
          system_provider
        </label>
        <input
          className="usa-input"
          id="system_provider"
          name="system_provider"
          onChange={(e) => {
            dispatch({
              type: "updateField",
              field: "system_provider",
              payload: e.target.value,
            });
          }}
        />

        {uploadFeedback[0] !== "" && (
          <div
            className="usa-summary-box width-mobile-lg"
            role="region"
            aria-labelledby="summary-box-key-information">
            <h3
              class="usa-summary-box__heading"
              id="summary-box-key-information">
              Status:
            </h3>
            <div className="usa-summary-box__text">{uploadFeedback[0]}</div>
          </div>
        )}
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
