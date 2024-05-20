import { DataStream } from "src/utils/api/dataStreams";

const mockDataStreams: DataStream[] = [
  {
    id: 1,
    name: "aims-celr",
    routes: ["csv", "hl7"],
  },
  {
    id: 2,
    name: "daart",
    routes: ["hl7"],
  },
];

export default mockDataStreams;
