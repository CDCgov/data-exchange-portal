import { ChangeEvent, useReducer, useState, useEffect } from "react";

import { Button } from "../../src/components/Button";
import { Alert } from "@us-gov-cdc/cdc-react";

import * as tus from "tus-js-client";

import { getEnv } from "../../src/utils/helperFunctions/env";

interface FileUpload {
  file: File;
  manifest: string;
}

interface DispatchAction {
  type: string;
  value?: any;
}

function UploadFiles() {
  const fileTypes = [".csv", ".hl7", ".txt"];

  const initialState: FileUpload = {
    file: new File([""], ""),
    manifest: "",
  };

  const [uploadFeedback, setUploadFeedback] = useState<Array<string>>(["", ""]);

  function reducer(state: FileUpload, action: DispatchAction) {
    switch (action.type) {
      case "updateFile":
        return {
          ...state,
          file: action.value,
        };
      case "updateManifest":
        return {
          ...state,
          manifest: action.value,
        };
      case "reset":
        return initialState;
      default:
        throw new Error("Unrecognized action type provided to form reducer");
    }
  }

  const [formState, dispatch] = useReducer(reducer, initialState);

  // This useEffect is to help with development
  useEffect(() => {
    console.log(
      "FormState(this is the payload that will be sent to the tus endpoint):",
      formState
    );
  }, [formState]);

  const handleFileSelection = () => {
    document?.getElementById("file-uploader")?.click();
  };

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch({
        type: "updateFile",
        value: e.target.files[0],
      });
    }
  };

  const handleManifestInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "updateManifest",
      value: e.target.value,
    });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  const handleUpload = () => {
    const upload = new tus.Upload(formState.file, {
      endpoint: getEnv("VITE_UPLOAD_API_ENDPOINT"),
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: formState.file.name,
        filetype: formState.file.type,
        manifest: formState.manifest,
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
      <section className="main_content padding-x-2">
        <h1 className="cdc-page-header padding-y-3 margin-0">Upload Files</h1>
        {/* Todo: Migrate this to be an <Alert> */}
        {uploadFeedback[0] !== "" && (
          <Alert className="margin-y-2" type="info">
            Status: {uploadFeedback[0]}
          </Alert>
        )}
        <div className="grid-row flex-row">
          <div className="grid-col flex-2">
            <div className="border border-base-lighter bg-white radius-md padding-3 margin-right-2">
              <div className="display-flex flex-row flex-justify-start flex-align-center margin-right-2">
                <Button
                  className="usa-button usa-button--outline margin-y-1"
                  id="choose-file"
                  type="button"
                  onClick={handleFileSelection}>
                  Choose file
                </Button>
                <input
                  type="file"
                  id="file-uploader"
                  name="file-uploader"
                  accept={fileTypes.toString()}
                  multiple
                  onChange={(e) => handleFileNameChange(e)}
                />
                <p id="file-name" className="text-italic text-normal">
                  {formState.file.name ? formState.file.name : "No file chosen"}
                </p>
              </div>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <h2 className="font-sans-lg text-normal padding-bottom-2">
                Manifest
              </h2>
              <Alert type="info">
                Each file submission must be accompanied by details in JSON
                format. The specific data expected to be provided is
                communicated to each organization during onboarding. Any
                questions should be directed to your organization admin.
              </Alert>
              <label className="usa-label" htmlFor="manifest">
                Input the Submission Manifest
              </label>
              <span id="manifest-hint" className="usa-hint">
                Supported format: JSON
              </span>
              <textarea
                className="usa-textarea"
                id="manifest"
                name="manifest"
                onChange={handleManifestInputChange}
                value={formState.manifest}></textarea>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <div className="margin-y-1">
                <Button type="submit" id="upload-button" onClick={handleUpload}>
                  Submit
                </Button>
                <Button
                  className="usa-button--outline"
                  type="button"
                  id="reset-button"
                  onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="grid-col border border-base-lighter bg-white padding-3 radius-md">
            <h2 className="font-sans-lg text-normal margin-bottom-2">
              Help: Submission Manifest Fields
            </h2>
            <dl>
              <dt className="font-mono-md padding-bottom-1">
                <strong>data_producer_id</strong>
              </dt>
              <dd>
                An alphabetical code that identifies the public health authority
                that supplies the data. In cases where the data producer is the
                same as the sender, the value should match the sender_id. In
                cases where this is not provided or known, use a value of
                "null."
              </dd>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <dt className="font-mono-md padding-bottom-1">
                <strong>data_stream_id</strong>
              </dt>
              <dd>
                An alphabetical code that identifies the CDC program receiving
                the data. This code is provided during onboarding.
              </dd>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <dt className="font-mono-md padding-bottom-1">
                <strong>data_stream_route</strong>
              </dt>
              <dd>
                The name of the folder destination for the data file. Typically
                this will match the submission file format.
              </dd>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <dt className="font-mono-md padding-bottom-1">
                <strong>jurisdiction</strong>
              </dt>
              <dd>
                An alphabetical code that identifies the city, county, state,
                tribe, or territory of the sender. This code is provided during
                onboarding.
              </dd>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <dt className="font-mono-md padding-bottom-1">
                <strong>sender_id</strong>
              </dt>
              <dd>
                An alphabetical code that identifies the sender, machine, or
                intermediary organization that's sending data. This code is
                provided during onboarding.
              </dd>
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <dt className="font-mono-md padding-bottom-1">
                <strong>version</strong>
              </dt>
              <dd>
                The version of the metadata being sent. In all new cases, this
                field value will be "2.0"
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

export default UploadFiles;
