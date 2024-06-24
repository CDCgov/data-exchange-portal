import { atom } from "recoil";
import { Timeframe } from "src/types/timeframes";
import { formatISO } from "date-fns";

export const dataStreamIdAtom = atom<string>({
  key: "dataStreamId",
  default: "",
});

export const dataRouteAtom = atom<string>({
  key: "dataRoute",
  default: "",
});

export const timeFrameAtom = atom<Timeframe>({
  key: "timeframe",
  default: Timeframe.Last7Days,
});

export const startDateAtom = atom<string>({
  key: "startDate",
  default: formatISO(new Date()),
});

export const endDateAtom = atom<string>({
  key: "endDate",
  default: formatISO(new Date()),
});

export const jurisdictionAtom = atom<string>({
  key: "jurisdiction",
  default: "",
});

export const senderIdAtom = atom<string>({
  key: "senderId",
  default: "",
});
