import { Manifest } from "src/utils/api/manifests";

const manifestJson = {
  metadata_config: {
    version: "1.0",
    fields: [
      {
        field_name: "filename",
        allowed_values: null,
        required: true,
        description: "The name of the file submitted.",
      },
    ],
  },
  copy_config: {
    filename_suffix: "upload_id",
    folder_structure: "date_YYYY_MM_DD",
    targets: ["routing", "edav"],
  },
};

const mockManifests: Manifest[] = [
  {
    id: 1,
    dataStreamRouteID: 1,
    config: manifestJson,
  },
  {
    id: 2,
    dataStreamRouteID: 1,
    config: manifestJson,
  },
  {
    id: 3,
    dataStreamRouteID: 2,
    config: manifestJson,
  },
  {
    id: 4,
    dataStreamRouteID: 3,
    config: manifestJson,
  },
];

export default mockManifests;
