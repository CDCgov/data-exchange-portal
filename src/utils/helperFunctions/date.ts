import { Timeframe } from "src/types/timeframes";
import { parseISO, isValid } from "date-fns";

const dataToString = (date: Date): string => {
  return date.toISOString();
};

const isoStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

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

export const isValidIsoString = (isoString: string): boolean => {
  if (!isoString) return false;

  if (!isoStringRegex.test(isoString)) return false;

  const date = parseISO(isoString);
  if (!isValid(date)) return false;

  const now = new Date();
  return date <= now;
};
