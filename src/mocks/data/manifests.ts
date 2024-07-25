import { Config, Manifest } from "src/utils/api/manifests";

const manifest1: Config = {
  metadata_config: {
    version: "2.0",
    fields: [
      {
        field_name: "sender_id",
        allowed_values: ["APHL"],
        required: true,
        description: "This field is the identifier for the sender of the data.",
        compat_field_name: "meta_username",
      },
      {
        field_name: "data_producer_id",
        allowed_values: null,
        required: true,
        description: "This field is the identifier for the data producer.",
      },
      {
        field_name: "jurisdiction",
        allowed_values: null,
        required: true,
        description:
          "This field indicates the jurisdiction associated with the data. If not provided, populate with null.",
        compat_field_name: "meta_organization",
      },
      {
        field_name: "received_filename",
        required: true,
        description: "This field is the name of the file when uploaded.",
        compat_field_name: "meta_ext_filename",
      },
      {
        field_name: "data_stream_id",
        allowed_values: ["celr"],
        required: true,
        description: "This field is the identifier for the data stream.",
        compat_field_name: "meta_destination_id",
      },
      {
        field_name: "data_stream_route",
        allowed_values: ["csv"],
        required: true,
        description: "This recieved is the route of the data stream.",
        compat_field_name: "meta_ext_event",
      },
      {
        field_name: "meta_ext_objectkey",
        required: true,
        allowed_values: null,
        description: "This field is used to track back to the source objectid.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_file_timestamp",
        required: true,
        allowed_values: null,
        description: "The timestamp on the source for file last modified.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_filestatus",
        required: true,
        allowed_values: null,
        description: "The file status in the source system.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_uploadid",
        required: true,
        allowed_values: null,
        description: "The uploadid in the system source.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_source",
        required: true,
        allowed_values: null,
        description: "The source system.",
        compat_field_name: null,
      },
    ],
  },
  copy_config: {
    filename_suffix: "upload_id",
    folder_structure: "date_YYYY_MM_DD",
    targets: ["routing"],
  },
};

const manifest2: Config = {
  metadata_config: {
    version: "2.0",
    fields: [
      {
        field_name: "sender_id",
        allowed_values: ["APHL"],
        required: true,
        description: "This field is the identifier for the sender of the data.",
        compat_field_name: "meta_username",
      },
      {
        field_name: "data_producer_id",
        allowed_values: null,
        required: true,
        description: "This field is the identifier for the data producer.",
      },
      {
        field_name: "jurisdiction",
        allowed_values: null,
        required: true,
        description:
          "This field indicates the jurisdiction associated with the data. If not provided, populate with null.",
        compat_field_name: "meta_organization",
      },
      {
        field_name: "received_filename",
        required: true,
        description: "This field is the name of the file when uploaded.",
        compat_field_name: "meta_ext_filename",
      },
      {
        field_name: "data_stream_id",
        allowed_values: ["celr"],
        required: true,
        description: "This field is the identifier for the data stream.",
        compat_field_name: "meta_destination_id",
      },
      {
        field_name: "data_stream_route",
        allowed_values: ["hl7v2"],
        required: true,
        description: "This recieved is the route of the data stream.",
        compat_field_name: "meta_ext_event",
      },
      {
        field_name: "meta_ext_objectkey",
        required: true,
        allowed_values: null,
        description: "This field is used to track back to the source objectid.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_file_timestamp",
        required: true,
        allowed_values: null,
        description: "The timestamp on the source for file last modified.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_filestatus",
        required: true,
        allowed_values: null,
        description: "The file status in the source system.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_uploadid",
        required: true,
        allowed_values: null,
        description: "The uploadid in the system source.",
        compat_field_name: null,
      },
      {
        field_name: "meta_ext_source",
        required: true,
        allowed_values: null,
        description: "The source system.",
        compat_field_name: null,
      },
    ],
  },
  copy_config: {
    filename_suffix: "upload_id",
    folder_structure: "date_YYYY_MM_DD",
    targets: ["routing"],
  },
};

const manifest3: Config = {
  metadata_config: {
    version: "2.0",
    fields: [
      {
        field_name: "sender_id",
        default_value: "APHL",
        required: true,
        description: "This field is the identifier for the sender of the data.",
      },
      {
        field_name: "data_producer_id",
        required: true,
        description: "This field is the identifier for the data producer.",
      },
      {
        field_name: "jurisdiction",
        required: true,
        description:
          "This field indicates the jurisdiction associated with the data. If not provided, populate with null.",
        compat_field_name: "reporting_jurisdiction",
      },
      {
        field_name: "received_filename",
        required: true,
        description: "This field is the name of the file when uploaded.",
        compat_field_name: "original_filename",
      },
      {
        field_name: "data_stream_id",
        required: true,
        description: "This field is the identifier for the data stream.",
        compat_field_name: "meta_destination_id",
      },
      {
        field_name: "data_stream_route",
        required: true,
        description: "This recieved is the route of the data stream.",
        compat_field_name: "meta_ext_event",
      },
      {
        field_name: "original_file_timestamp",
        allowed_values: null,
        required: false,
        description: "The timestamp of last modified for the file submitted.",
      },
      {
        field_name: "message_type",
        allowed_values: ["ELR"],
        required: true,
        description: "Identifies if the message is a CASE message or ELR",
      },
      {
        field_name: "route",
        allowed_values: ["DAART"],
        required: true,
        description: "Informs the type of ELR messages when message_type = ELR",
      },
    ],
  },
  copy_config: {
    filename_suffix: "upload_id",
    folder_structure: "date_YYYY_MM_DD",
    targets: ["routing"],
  },
};

const manifest4 = {
  metadata_config: {
    version: "2.0",
    fields: [
      {
        field_name: "data_stream_id",
        required: true,
        allowed_values: ["ehdi"],
        description: "This field is the identifier for the data stream.",
      },
      {
        field_name: "data_stream_route",
        required: true,
        allowed_values: ["csv"],
        description: "This recieved is the route of the data stream.",
      },
      {
        field_name: "sender_id",
        required: true,
        allowed_values: [
          "RI-PHA",
          "IN-PHA",
          "UT-PHA",
          "IA-PHA",
          "LA-PHA",
          "NJ-PHA",
          "ND-PHA",
          "NE-PHA",
          "MI-PHA",
        ],
        description: "This field is the identifier for the sender of the data.",
      },
      {
        field_name: "data_producer_id",
        required: true,
        allowed_values: [
          "RI-PHA",
          "IN-PHA",
          "UT-PHA",
          "IA-PHA",
          "LA-PHA",
          "NJ-PHA",
          "ND-PHA",
          "NE-PHA",
          "MI-PHA",
        ],
        description: "This field is the identifier for the data producer.",
      },
      {
        field_name: "jurisdiction",
        required: true,
        allowed_values: ["RI", "IN", "UT", "IA", "LA", "NJ", "ND", "NE", "MI"],
        description:
          "This field indicates the jurisdiction associated with the data. If not provided, populate with null.",
      },
      {
        field_name: "received_filename",
        required: true,
        description:
          "This field is the name of the file when uploaded by the sender.",
      },
    ],
  },
  copy_config: {
    filename_suffix: "upload_id",
    folder_structure: "date_YYYY_MM_DD",
    targets: ["routing"],
  },
};

const mockManifests: Manifest[] = [
  {
    id: 1,
    dataStreamRouteID: 1,
    config: manifest1,
  },
  {
    id: 2,
    dataStreamRouteID: 2,
    config: manifest2,
  },
  {
    id: 3,
    dataStreamRouteID: 3,
    config: manifest3,
  },
  {
    id: 4,
    dataStreamRouteID: 4,
    config: manifest4,
  },
];

export default mockManifests;
