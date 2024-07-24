import { DataStream, DataStreamWithRoutes } from "src/utils/api/dataStreams";

export const mockDataStreams: DataStream[] = [
  {
    id: 1,
    name: "aims-celr",
  },
  {
    id: 2,
    name: "daart",
  },
];

export const mockDataStreamsWithRoutes: DataStreamWithRoutes[] = [
  {
    datastream: {
      id: 1,
      name: "aims-celr",
    },
    routes: [
      {
        id: 1,
        dataStreamID: 1,
        name: "csv",
        writePermissions: false,
      },
      {
        id: 2,
        dataStreamID: 1,
        name: "hl7",
        writePermissions: false,
      },
    ],
  },
  {
    datastream: {
      id: 2,
      name: "daart",
    },
    routes: [
      {
        id: 3,
        dataStreamID: 2,
        name: "hl7",
        writePermissions: false,
      },
    ],
  },
  {
    datastream: {
      id: 3,
      name: "ehdi",
    },
    routes: [
      {
        id: 4,
        dataStreamID: 2,
        name: "csv",
        writePermissions: true,
      },
    ],
  },
  {
    datastream: {
      id: 4,
      name: "eicr",
    },
    routes: [
      {
        id: 5,
        dataStreamID: 4,
        name: "fhir",
        writePermissions: true,
      },
    ],
  },
];
