import { Timeframe } from "src/types/timeframes";

const dataToString = (date: Date): string => {
  return date.toISOString();
};

export const getPastDate = (daysBefore: Timeframe): string => {
  const today = new Date();

  switch (daysBefore) {
    case Timeframe.Last30Days:
      return dataToString(new Date(new Date().setDate(today.getDate() - 30)));
    case Timeframe.Last15Days:
      return dataToString(new Date(new Date().setDate(today.getDate() - 15)));
    case Timeframe.Last7Days:
      return dataToString(new Date(new Date().setDate(today.getDate() - 7)));
    case Timeframe.LastDay:
      return dataToString(new Date(new Date().setDate(today.getDate() - 1)));
    default:
      return dataToString(new Date(new Date().setDate(today.getDate() - 1)));
  }
};
