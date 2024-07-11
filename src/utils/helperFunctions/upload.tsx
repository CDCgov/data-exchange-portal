import { DispatchAction } from "src/screens/UploadFiles";
import { Select } from "src/components/formFields/Select";
import { TextInput } from "src/components/formFields/TextInput";
import { ManifestField } from "src/utils/api/manifests";

export const knownFieldNames = [
  "data_producer_id",
  "jurisdiction",
  "sender_id",
  "version",
];

export const santizeFields = (fields: ManifestField[]) => {
  const withoutDataStreamAndRoute = fields.filter(
    (field: ManifestField) =>
      field.field_name != "data_stream_id" &&
      field.field_name != "data_stream_route"
  );
  return withoutDataStreamAndRoute;
};

export const renderField = (
  field: ManifestField,
  type: "known" | "extra",
  dispatch: React.Dispatch<DispatchAction>
) => {
  const updateActionType =
    type === "known" ? "updateKnownField" : "updateExtraField";

  if (field.allowed_values) {
    return (
      <Select
        className="padding-top-2 flex-1"
        key={field.field_name}
        id={field.field_name}
        label={field.field_name}
        hint={field.description}
        required={field.required}
        options={field.allowed_values}
        onChange={(e) =>
          dispatch({
            type: updateActionType,
            fieldName: field.field_name,
            value: e.target.value,
          })
        }
      />
    );
  }

  return (
    <TextInput
      className="padding-top-2 flex-1"
      key={field.field_name}
      id={field.field_name}
      label={field.field_name}
      hint={field.description}
      required={field.required}
      onChange={(e) =>
        dispatch({
          type: updateActionType,
          fieldName: field.field_name,
          value: e.target.value,
        })
      }
    />
  );
};
