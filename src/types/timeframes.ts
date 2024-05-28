export enum Timeframe {
  Last30Days = "Last 30 Days",
  Last15Days = "Last 15 Days",
  Last7Days = "Last 7 Days",
  LastDay = "Last Day",
}

const timeframes: Timeframe[] = [
  Timeframe.Last30Days,
  Timeframe.Last15Days,
  Timeframe.Last7Days,
  Timeframe.LastDay,
];

export default timeframes;
