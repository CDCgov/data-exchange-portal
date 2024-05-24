import { atom } from "recoil";
import { DataStreamWithRoutes } from "src/utils/api/dataStreams";

export const dataStreamsAtom = atom<DataStreamWithRoutes[]>({
  key: "dataStreams",
  default: [],
});
