import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useRecoilValue } from "recoil";

import FileSelector from "src/components/FileSelector";
import ManifestDefinitions from "src/components/ManifestDefs";
import { Button } from "../../src/components/Button";
import Select from "src/components/formFields/Select";
import ErrorMessage from "src/components/formFields/ErrorMessage";
import TextInput from "src/components/formFields/TextInput";
import { Alert, AlertProps } from "@us-gov-cdc/cdc-react";

import * as tus from "tus-js-client";

import API_ENDPOINTS from "src/config/api";
import { dataStreamsAtom } from "src/state/dataStreams";
import {
  getDatastreamNames,
  getDatastreamRouteNames,
  getWriteOnlyDatastreamsWithRoutes,
} from "src/utils/helperFunctions/metadataFilters";
import { getManifests, Manifest, ManifestField } from "src/utils/api/manifests";
import {
  isFormValid,
  generateFormData,
  knownFieldNames,
  renderField,
  santizeFields,
} from "src/utils/helperFunctions/upload";
import { ValidationStatus } from "src/types/validationStatus";

export interface UploadField extends ManifestField {
  value: string;
  validationStatus: ValidationStatus;
}

export interface FileUpload {
  file: File | null;
  fileValidationStatus: ValidationStatus;
  datastream: string;
  route: string;
  version: string;
  versionValidationStatus: ValidationStatus;
  knownFields: UploadField[];
  extraFields: UploadField[];
}

export interface DispatchAction {
  type: string;
  fieldName?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value?: any;
}

function UploadFiles() {
  const auth = useAuth();

  const initialState: FileUpload = {
    file: new File([""], ""),
    fileValidationStatus: null,
    datastream: "",
    route: "",
    version: "",
    versionValidationStatus: null,
    knownFields: [],
    extraFields: [],
  };

  const dataStreams = useRecoilValue(dataStreamsAtom);
  const writeOnlyDatastreams = getWriteOnlyDatastreamsWithRoutes(dataStreams);
  const [uploadResultMessage, setUploadResultMessage] = useState("");
  const [uploadResultAlert, setUploadResultAlert] =
    useState<AlertProps["type"]>("info");
  const [isUploading, setIsUploading] = useState(false);

  function reducer(state: FileUpload, action: DispatchAction) {
    switch (action.type) {
      case "updateFile":
        return {
          ...state,
          file: action.value,
          fileValidationStatus: null,
        };
      case "validateFile":
        return {
          ...state,
          fileValidationStatus: action.value,
        };
      case "updateDatastreamAndReset":
        return {
          ...state,
          datastream: action.value,
          route: "",
          version: "",
          knownFields: [],
          extraFields: [],
        };
      case "updateRoute":
        return {
          ...state,
          route: action.value,
          version: "",
          knownFields: [],
          extraFields: [],
        };
      case "updateVersion":
        return {
          ...state,
          version: action.value,
          versionValidationStatus: null,
        };
      case "validateVersion":
        return {
          ...state,
          versionValidationStatus: action.value,
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
              ? { ...field, value: action.value, validationStatus: null }
              : field
          ),
        };
      case "validateKnownField":
        return {
          ...state,
          knownFields: state.knownFields.map((field) =>
            field.field_name === action.fieldName
              ? { ...field, validationStatus: action.value }
              : field
          ),
        };
      case "updateExtraField":
        return {
          ...state,
          extraFields: state.extraFields.map((field) =>
            field.field_name === action.fieldName
              ? { ...field, value: action.value, validationStatus: null }
              : field
          ),
        };
      case "validateExtraField":
        return {
          ...state,
          extraFields: state.extraFields.map((field) =>
            field.field_name === action.fieldName
              ? { ...field, validationStatus: action.value }
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

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch({
        type: "updateFile",
        value: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    setUploadResultMessage("");
    setUploadResultAlert("info");

    const handleGetManifest = async () => {
      const res = await getManifests(
        auth.user?.access_token ?? "",
        formState.datastream,
        formState.route
      );

      if (res.status != 200) {
        setUploadResultMessage("There was an issue retrieving the manifest.");
        setUploadResultAlert("error");
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

  const handleReset = () => {
    dispatch({ type: "reset" });

    // Manually reset file input since reselecting same file wont trigger onChange
    const inputElement = document.getElementById(
      "file-uploader"
    ) as HTMLInputElement;
    if (inputElement) inputElement.value = ""; // Set to an empty string to clear
  };

  const handleUpload = () => {
    if (!isFormValid(formState, dispatch)) {
      setUploadResultMessage(
        "All required fields must be completed and a file must be selected."
      );
      setUploadResultAlert("error");
      return;
    }

    setIsUploading(true);
    setUploadResultMessage(`Starting...`);
    setUploadResultAlert("info");
    try {
      const formData = generateFormData(formState);
      const upload = new tus.Upload(formState.file, {
        endpoint: API_ENDPOINTS.upload,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        metadata: {
          received_filename: formState.file.name,
          ...formData,
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
      setUploadResultMessage(
        "Upload failed: please confirm all details and try again."
      );
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
              <FileSelector
                file={formState.file}
                handleFileChange={handleFileNameChange}
              />
              {formState.fileValidationStatus == "error" && (
                <ErrorMessage> A file must be selected</ErrorMessage>
              )}
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <h2 className="font-sans-lg text-normal padding-bottom-1">
                Submission Details
              </h2>
              <Select
                className="padding-top-2 flex-1"
                id="data-stream-id"
                label="Data Stream"
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  dispatch({
                    type: "updateDatastreamAndReset",
                    value: e.target.value,
                  });
                }}
                options={getDatastreamNames(writeOnlyDatastreams)}
                defaultValue={formState.datastream}
              />
              {formState.datastream && (
                <Select
                  className="padding-top-2 flex-1"
                  id="data-route"
                  label="Route"
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch({
                      type: "updateRoute",
                      value: e.target.value,
                    });
                  }}
                  options={getDatastreamRouteNames(
                    writeOnlyDatastreams,
                    formState.datastream
                  )}
                  defaultValue={formState.route}
                />
              )}
              {formState.knownFields.map((field: UploadField) =>
                renderField(field, "known", dispatch)
              )}
              {!!formState.knownFields.length && (
                <TextInput
                  className="padding-top-2 flex-1"
                  id="version"
                  label="Version"
                  required
                  onChange={(e) =>
                    dispatch({
                      type: "updateVersion",
                      value: e.target.value,
                    })
                  }
                  defaultValue={formState.version}
                  validationStatus={formState.versionValidationStatus}
                />
              )}
              {!!formState.extraFields.length && (
                <>
                  <hr className="margin-y-3 border-1px border-base-lighter" />
                  <h2 className="font-sans-lg text-normal padding-bottom-1">
                    Additional Details
                  </h2>
                </>
              )}
              {formState.extraFields.map((field: UploadField) =>
                renderField(field, "extra", dispatch)
              )}
              <hr className="margin-y-2 border-1px border-base-lighter" />
              <div className="margin-y-1">
                <Button
                  disabled={
                    !formState.datastream || !formState.route || isUploading
                  }
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
          <ManifestDefinitions />
        </div>
      </section>
    </>
  );
}

export default UploadFiles;
