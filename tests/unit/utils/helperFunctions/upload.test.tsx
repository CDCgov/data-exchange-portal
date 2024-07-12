import { describe, it, expect, vi } from "vitest";
import {
  generateFormData,
  isFormValid,
  renderField,
  santizeFields,
} from "src/utils/helperFunctions/upload";
import { FileUpload, UploadField } from "src/screens/UploadFiles";
import { ManifestField } from "src/utils/api/manifests";

describe("Helper Functions For UploadFiles Screen", () => {
  const initialState: FileUpload = {
    file: new File([""], "test.txt"),
    fileValidationStatus: null,
    datastream: "datastream1",
    route: "route1",
    version: "1.0",
    versionValidationStatus: null,
    knownFields: [
      {
        field_name: "data_producer_id",
        value: "producer1",
        required: true,
        validationStatus: null,
      },
      {
        field_name: "jurisdiction",
        value: "",
        required: true,
        validationStatus: null,
      },
    ],
    extraFields: [
      {
        field_name: "extraField1",
        value: "value1",
        required: true,
        validationStatus: null,
      },
      {
        field_name: "extraField2",
        value: "",
        required: false,
        validationStatus: null,
      },
    ],
  };

  it("should generate form data correctly", () => {
    const formData = generateFormData(initialState);
    expect(formData).toEqual({
      data_stream_id: "datastream1",
      data_stream_route: "route1",
      version: "1.0",
      data_producer_id: "producer1",
      jurisdiction: "",
      extraField1: "value1",
      extraField2: "",
    });
  });

  it("should validate form correctly", () => {
    const dispatch = vi.fn();
    expect(isFormValid(initialState, dispatch)).toBe(false);

    const validState = {
      ...initialState,
      knownFields: [
        {
          field_name: "data_producer_id",
          value: "producer1",
          required: true,
          validationStatus: null,
        },
        {
          field_name: "jurisdiction",
          value: "jurisdiction1",
          required: true,
          validationStatus: null,
        },
      ],
    };
    expect(isFormValid(validState, dispatch)).toBe(true);
  });

  it("should sanitize fields correctly", () => {
    const fields: ManifestField[] = [
      {
        field_name: "data_stream_id",
        required: true,
        description: "",
        allowed_values: [],
      },
      {
        field_name: "data_stream_route",
        required: true,
        description: "",
        allowed_values: [],
      },
      {
        field_name: "field1",
        required: true,
        description: "desc1",
        allowed_values: [],
      },
    ];

    const sanitizedFields = santizeFields(fields);
    expect(sanitizedFields).toEqual([
      {
        field_name: "field1",
        required: true,
        description: "desc1",
        allowed_values: [],
        value: "",
        validationStatus: null,
      },
    ]);
  });

  it("should render field correctly", () => {
    const dispatch = vi.fn();
    const field: UploadField = {
      field_name: "testField",
      value: "",
      validationStatus: null,
      required: true,
      allowed_values: ["option1", "option2"],
      description: "A test field",
    };

    const component = renderField(field, "extra", dispatch);
    expect(component.props.id).toBe("testField");
    expect(component.props.label).toBe("testField");
    expect(component.props.required).toBe(true);
    expect(component.props.options).toEqual(["option1", "option2"]);
  });
});
