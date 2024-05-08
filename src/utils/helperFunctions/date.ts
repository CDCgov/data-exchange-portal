import { Timeframe } from "src/types/timeframes";

const convertDate = (date: Date): string => {
  // const convertedDate: string = `${date
  //   .toISOString()
  //   .replace(/-/g, "")
  //   .replace(/:/g, "")
  //   .replace(/\./g, "")
  //   .slice(0, -4)}Z`;

  return date.toISOString();
};

export const getPastDate = (daysBefore: Timeframe): string => {
  const today = new Date();

  switch (daysBefore) {
    case Timeframe.Last30Days:
      return convertDate(new Date(new Date().setDate(today.getDate() - 30)));
    case Timeframe.Last15Days:
      return convertDate(new Date(new Date().setDate(today.getDate() - 15)));
    case Timeframe.Last7Days:
      return convertDate(new Date(new Date().setDate(today.getDate() - 7)));
    case Timeframe.LastDay:
      return convertDate(new Date(new Date().setDate(today.getDate() - 1)));
    default:
      return convertDate(new Date("2021-01-01T05:00:00Z"));
  }
};

export default convertDate;
