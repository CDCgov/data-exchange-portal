import { SelectOption } from "src/components/formFields/Select";

export enum Timeframe {
  Last30Days = "Last 30 Days",
  Last15Days = "Last 15 Days",
  Last7Days = "Last 7 Days",
  LastDay = "Last Day",
  Custom = "Custom",
}

const timeframes: Timeframe[] = [
  Timeframe.Last30Days,
  Timeframe.Last15Days,
  Timeframe.Last7Days,
  Timeframe.LastDay,
  Timeframe.Custom,
];

export const timeframeOptions: SelectOption[] = timeframes.map(
  (t: Timeframe) => ({ value: t, display: t })
);

export default timeframes;
