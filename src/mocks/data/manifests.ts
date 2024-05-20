import { Manifest } from "src/utils/api/manifests";

const manifestJson = JSON.stringify({
  config: {
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
  },
});

const mockManifests: Manifest[] = [
  {
    id: 1,
    datastreamId: 1,
    routeId: 1,
    manifestJson,
  },
  {
    id: 2,
    datastreamId: 1,
    routeId: 2,
    manifestJson,
  },
  {
    id: 3,
    datastreamId: 2,
    routeId: 1,
    manifestJson,
  },
  {
    id: 4,
    datastreamId: 2,
    routeId: 2,
    manifestJson,
  },
];

export default mockManifests;
