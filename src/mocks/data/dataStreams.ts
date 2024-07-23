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
        writePermissions: true,
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
        writePermissions: true,
      },
    ],
  },
];
