import { DataStream } from "src/utils/api/dataStreams";

const mockDataStreams: DataStream[] = [
  {
    id: 1,
    name: "aims-celr",
    programId: 1,
    routes: ["csv", "hl7"],
  },
  {
    id: 2,
    name: "daart",
    programId: 1,
    routes: ["hl7"],
  },
];

export default mockDataStreams;
