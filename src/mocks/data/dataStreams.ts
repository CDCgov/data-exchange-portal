import { DataStream, DataStreamWithRoutes } from "src/utils/api/dataStreams";

export const mockDataStreams: DataStream[] = [
  {
    id: 1,
    programID: 1,
    name: "aims-celr",
  },
  {
    id: 2,
    programID: 1,
    name: "daart",
  },
];

export const mockDataStreamsWithRoutes: DataStreamWithRoutes[] = [
  {
    datastream: {
      id: 1,
      programID: 1,
      name: "dextesting",
    },
    routes: [
      {
        id: 1,
        dataStreamID: 1,
        name: "testevent1",
      },
      {
        id: 2,
        dataStreamID: 1,
        name: "testevent2",
      },
    ],
  },
  {
    datastream: {
      id: 2,
      programID: 1,
      name: "dextesting_2",
    },
    routes: [
      {
        id: 3,
        dataStreamID: 2,
        name: "testevent3",
      },
      {
        id: 4,
        dataStreamID: 2,
        name: "testevent4",
      },
    ],
  },
];
