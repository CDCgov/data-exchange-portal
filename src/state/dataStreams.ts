import { atom } from "recoil";
import { DataStream } from "src/utils/api/dataStreams";

export const dataStreamsAtom = atom<DataStream[]>({
  key: "dataStreams",
  default: [],
});
