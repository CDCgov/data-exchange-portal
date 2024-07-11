import { DispatchAction } from "src/screens/UploadFiles";
import { Select } from "src/components/formFields/Select";
import { TextInput } from "src/components/formFields/TextInput";
import { ManifestField } from "src/utils/api/manifests";

export const renderDynamicField = (
  field: ManifestField,
  dispatch: React.Dispatch<DispatchAction>
) => {
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
            type: "updateDynamicField",
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
          type: "updateDynamicField",
          fieldName: field.field_name,
          value: e.target.value,
        })
      }
    />
  );
};
