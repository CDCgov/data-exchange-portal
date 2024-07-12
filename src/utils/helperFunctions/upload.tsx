import {
  DispatchAction,
  FileUpload,
  UploadField,
} from "src/screens/UploadFiles";
import Select from "src/components/formFields/Select";
import TextInput from "src/components/formFields/TextInput";
import { ManifestField } from "src/utils/api/manifests";

export const knownFieldNames = [
  "data_producer_id",
  "jurisdiction",
  "sender_id",
];

export const generateFormData = (state: FileUpload) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const formData: any = {
    data_stream_id: state.datastream,
    data_stream_route: state.route,
    version: state.version,
  };

  state.knownFields.forEach((field: UploadField) => {
    formData[field.field_name] = field.value;
  });

  state.extraFields.forEach((field: UploadField) => {
    formData[field.field_name] = field.value;
  });

  return formData;
};

export const isFormValid = (
  state: FileUpload,
  dispatch: React.Dispatch<DispatchAction>
) => {
  let isValid = true;

  if (!state.file?.name) {
    dispatch({
      type: "validateFile",
      value: "error",
    });
    isValid = false;
  }

  if (!state.datastream || !state.route) isValid = false;

  if (!state.version) {
    dispatch({
      type: "validateVersion",
      value: "error",
    });
    isValid = false;
  }

  for (const field of state.knownFields) {
    if (field.required && !field.value) {
      dispatch({
        type: "validateKnownField",
        fieldName: field.field_name,
        value: "error",
      });
      isValid = false;
    }
  }

  for (const field of state.extraFields) {
    if (field.required && !field.value) {
      dispatch({
        type: "validateExtraField",
        fieldName: field.field_name,
        value: "error",
      });
      isValid = false;
    }
  }

  return isValid;
};

export const isSubmitDisabled = (state: FileUpload) => {
  if (
    !state.datastream ||
    state.datastream == "- Select -" ||
    !state.route ||
    state.route == "- Select -"
  ) {
    return false;
  }

  return true;
};

export const renderField = (
  field: UploadField,
  type: "known" | "extra",
  dispatch: React.Dispatch<DispatchAction>
) => {
  const updateActionType =
    type == "known" ? "updateKnownField" : "updateExtraField";

  const getLabel = (fieldName: string) => {
    switch (fieldName) {
      case "data_producer_id":
        return "Data Producer";
      case "sender_id":
        return "Data Sender";
      case "jurisdiction":
        return "Jurisdiction";
      default:
        return fieldName;
    }
  };

  if (field.allowed_values) {
    return (
      <Select
        className="padding-top-2 flex-1"
        key={field.field_name}
        id={field.field_name}
        label={getLabel(field.field_name)}
        hint={type == "known" ? undefined : field.description}
        required={field.required}
        options={field.allowed_values}
        onChange={(e) =>
          dispatch({
            type: updateActionType,
            fieldName: field.field_name,
            value: e.target.value,
          })
        }
        defaultValue={field.value}
        validationStatus={field.validationStatus}
      />
    );
  }

  return (
    <TextInput
      className="padding-top-2 flex-1"
      key={field.field_name}
      id={field.field_name}
      label={getLabel(field.field_name)}
      hint={type == "known" ? undefined : field.description}
      required={field.required}
      onChange={(e) =>
        dispatch({
          type: updateActionType,
          fieldName: field.field_name,
          value: e.target.value,
        })
      }
      defaultValue={field.value}
      validationStatus={field.validationStatus}
    />
  );
};

export const santizeFields = (fields: ManifestField[]) => {
  const withoutDataStreamAndRoute: ManifestField[] = fields.filter(
    (field: ManifestField) =>
      field.field_name != "data_stream_id" &&
      field.field_name != "data_stream_route"
  );

  const fieldsWithValue: UploadField[] = withoutDataStreamAndRoute.map(
    (field: ManifestField) => ({ ...field, value: "", validationStatus: null })
  );

  return fieldsWithValue;
};
