import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useRecoilValue } from "recoil";

import ManifestDefinitions from "src/components/ManifestDefs";
import { Button } from "../../src/components/Button";
import Select from "src/components/formFields/Select";
import TextInput from "src/components/formFields/TextInput";
import { Alert, AlertProps } from "@us-gov-cdc/cdc-react";

import * as tus from "tus-js-client";

import API_ENDPOINTS from "src/config/api";
import { dataStreamsAtom } from "src/state/dataStreams";
import {
  getDataStreamIds,
  getDataRoutes,
} from "src/utils/helperFunctions/metadataFilters";
import { getManifests, Manifest, ManifestField } from "src/utils/api/manifests";
import {
  knownFieldNames,
  renderField,
  santizeFields,
} from "src/utils/helperFunctions/upload";

interface FileUpload {
  file: File;
  datastream: string;
  route: string;
  version: string;
  knownFields: ManifestField[];
  extraFields: ManifestField[];
}

export interface DispatchAction {
  type: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  fieldName?: string;
  value?: any;
}

function UploadFiles() {
  const auth = useAuth();

  const initialState: FileUpload = {
    file: new File([""], ""),
    datastream: "",
    route: "",
    version: "",
    knownFields: [],
    extraFields: [],
  };

  const dataStreams = useRecoilValue(dataStreamsAtom);
  const [uploadResultMessage, setUploadResultMessage] = useState("");
  const [uploadResultAlert, setUploadResultAlert] =
    useState<AlertProps["type"]>("info");
  const [formInProgress, setFormInProgress] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  function reducer(state: FileUpload, action: DispatchAction) {
    switch (action.type) {
      case "updateFile":
        return {
          ...state,
          file: action.value,
        };
      case "updateDatastream":
        return {
          ...state,
          datastream: action.value,
        };
      case "updateRoute":
        return {
          ...state,
          route: action.value,
        };
      case "updateVersion":
        return {
          ...state,
          version: action.value,
        };
      case "setFields": {
        const knownFields = action.value.filter((field: ManifestField) =>
          knownFieldNames.includes(field.field_name)
        );
        const extraFields = action.value.filter(
          (field: ManifestField) => !knownFieldNames.includes(field.field_name)
        );
        return {
          ...state,
          knownFields,
          extraFields,
        };
      }
      case "updateKnownField":
        return {
          ...state,
          knownFields: state.knownFields.map((field) =>
            field.field_name === action.fieldName
              ? { ...field, value: action.value }
              : field
          ),
        };
      case "updateExtraField":
        return {
          ...state,
          extraFields: state.extraFields.map((field) =>
            field.field_name === action.fieldName
              ? { ...field, value: action.value }
              : field
          ),
        };
      case "reset": {
        setUploadResultMessage("");
        setIsUploading(false);
        return initialState;
      }
      default:
        throw new Error("Unrecognized action type provided to form reducer");
    }
  }

  const [formState, dispatch] = useReducer(reducer, initialState);

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

  const handleDatastream = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "updateDatastream",
      value: e.target.value,
    });
    dispatch({
      type: "updateRoute",
      value: "",
    });
    dispatch({
      type: "updateVersion",
      value: "",
    });
    dispatch({
      type: "setFields",
      value: [],
    });
  };

  const handleRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "updateRoute",
      value: e.target.value,
    });
  };

  useEffect(() => {
    const handleGetManifest = async () => {
      const res = await getManifests(
        auth.user?.access_token ?? "",
        formState.datastream,
        formState.route
      );

      if (res.status != 200) {
        // TODO messaging for manifest can't be retrieved
        return;
      }

      const manifest: Manifest = (await res.json()) as Manifest;
      const fields: ManifestField[] =
        manifest?.config?.metadata_config?.fields ?? [];
      const version = manifest?.config?.metadata_config?.version ?? "";

      if (fields?.length) {
        const sanitizedFields = santizeFields(fields);
        dispatch({ type: "setFields", value: sanitizedFields });
        dispatch({
          type: "updateVersion",
          value: version,
        });
      }
    };

    if (formState.datastream && formState.route) handleGetManifest();
  }, [auth, formState.datastream, formState.route]);

  useEffect(() => {
    formState?.file.name !== ""
      ? setFormInProgress(false)
      : setFormInProgress(true);
  }, [formState]);

  const handleReset = () => {
    dispatch({ type: "reset" });

    // Manually reset file input since reselecting same file wont trigger onChange
    const inputElement = document.getElementById(
      "file-uploader"
    ) as HTMLInputElement;
    if (inputElement) inputElement.value = ""; // Set to an empty string to clear
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadResultMessage(`Starting...`);
    setUploadResultAlert("info");
    try {
      // const parsedJson = JSON.parse(formState.manifest);
      const upload = new tus.Upload(formState.file, {
        endpoint: API_ENDPOINTS.upload,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        metadata: {
          received_filename: formState.file.name,
          // ...parsedJson,
        },
        onError: function (error) {
          setUploadResultMessage(`Upload failed: ${error.message}`);
          setUploadResultAlert("error");
          setIsUploading(false);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setUploadResultMessage(`Uploading: ${percentage}%`);
          setUploadResultAlert("info");
        },
        onSuccess: function () {
          setUploadResultMessage(`Upload successful`);
          setUploadResultAlert("success");
          setIsUploading(false);
        },
      });

      upload.start();
    } catch (error) {
      setUploadResultMessage(`Upload failed: error parsing JSON`);
      setUploadResultAlert("error");
      setIsUploading(false);
    }
  };

  return (
    <>
      <section className="main_content padding-x-2">
        <h1 className="cdc-page-header padding-y-3 margin-0">Upload Files</h1>
        {uploadResultMessage.length > 0 && (
          <Alert
            data-testid="error-alert"
            className="margin-y-2"
            type={uploadResultAlert}>
            {uploadResultMessage}
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
                  data-testid="file-uploader"
                  type="file"
                  id="file-uploader"
                  name="file-uploader"
                  multiple
                  onChange={(e) => handleFileNameChange(e)}
                />
                <p
                  id="file-name"
                  data-testid="file-name"
                  className="text-italic text-normal">
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
              <Select
                className="padding-top-2 flex-1"
                id="data-stream-id"
                label="data_stream_id"
                onChange={handleDatastream}
                options={getDataStreamIds(dataStreams)}
                defaultValue={formState.datastream}
              />
              {formState.datastream && (
                <Select
                  className="padding-top-2 flex-1"
                  id="data-route"
                  label="data_stream_route"
                  onChange={handleRoute}
                  options={getDataRoutes(
                    dataStreams,
                    formState.datastream,
                    true
                  )}
                  defaultValue={formState.route}
                />
              )}
              {formState.knownFields.map((field: ManifestField) =>
                renderField(field, "known", dispatch)
              )}
              {formState.version && (
                <TextInput
                  className="padding-top-2 flex-1"
                  id="version"
                  label="version"
                  required={true}
                  onChange={(e) =>
                    dispatch({
                      type: "updateVersion",
                      value: e.target.value,
                    })
                  }
                  defaultValue={formState.version}
                />
              )}
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <h3 className="font-sans-lg text-normal padding-y-1">
                Additional Fields
              </h3>
              {formState.extraFields.map((field: ManifestField) =>
                renderField(field, "extra", dispatch)
              )}
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <div className="margin-y-1">
                <Button
                  disabled={formInProgress || isUploading}
                  type="submit"
                  id="upload-button"
                  onClick={handleUpload}>
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
            <ManifestDefinitions />
          </div>
        </div>
      </section>
    </>
  );
}

export default UploadFiles;
