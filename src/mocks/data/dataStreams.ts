import { DataStream, DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { mockRoutes1, mockRoutes2 } from "src/mocks/data/routes";

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
    id: 1,
    programID: 1,
    name: "aims-celr",
    routes: mockRoutes1,
  },
  {
    id: 2,
    programID: 1,
    name: "daart",
    routes: mockRoutes2,
  },
];
