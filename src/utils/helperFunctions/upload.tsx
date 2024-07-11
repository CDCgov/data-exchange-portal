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

export const isFormValid = (state: FileUpload) => {
  if (!state.file?.name) return false;

  if (!state.datastream || !state.route || !state.version) return false;

  for (const field of state.knownFields) {
    if (field.required && !field.value) {
      return false;
    }
  }

  for (const field of state.extraFields) {
    if (field.required && !field.value) {
      return false;
    }
  }

  return true;
};

export const santizeFields = (fields: ManifestField[]) => {
  const withoutDataStreamAndRoute: ManifestField[] = fields.filter(
    (field: ManifestField) =>
      field.field_name != "data_stream_id" &&
      field.field_name != "data_stream_route"
  );

  const fieldsWithValue: UploadField[] = withoutDataStreamAndRoute.map(
    (field: ManifestField) => ({ ...field, value: "" })
  );

  return fieldsWithValue;
};

export const renderField = (
  field: UploadField,
  type: "known" | "extra",
  dispatch: React.Dispatch<DispatchAction>
) => {
  const updateActionType =
    type == "known" ? "updateKnownField" : "updateExtraField";

  if (field.allowed_values) {
    return (
      <Select
        className="padding-top-2 flex-1"
        key={field.field_name}
        id={field.field_name}
        label={field.field_name}
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
      />
    );
  }

  return (
    <TextInput
      className="padding-top-2 flex-1"
      key={field.field_name}
      id={field.field_name}
      label={field.field_name}
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
    />
  );
};
