import { vi } from "vitest";
import convertDate, { getPastDate } from "src/utils/helperFunctions/date";
import { Timeframe } from "src/types/timeframes";

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2020-01-01"));
});

afterAll(() => {
  vi.useRealTimers();
});

describe("Date Conversion", () => {
  it("should return a compatible date string for api calls", async () => {
    const validDate = new Date("Thu Mar 28 2024");
    const validDateString = "20240328T000000Z";

    const convertedDate = convertDate(validDate);
    expect(convertedDate).toStrictEqual(validDateString);
  });
  it("should return another compatible date string for api calls", async () => {
    const validDate = new Date("Thu Mar 20 2024");
    const validDateString = "20240320T000000Z";

    const convertedDate = convertDate(validDate);
    expect(convertedDate).toStrictEqual(validDateString);
  });
});

describe("Get Past Date - Timeframes", () => {
  it("Should return 30 days prior", async () => {
    const pastDate = getPastDate(Timeframe.Last30Days);
    const pastDateValue = "20191202T000000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
  it("Should return 15 days prior", async () => {
    const pastDate = getPastDate(Timeframe.Last15Days);
    const pastDateValue = "20191217T000000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
  it("Should return 7 days prior", async () => {
    const pastDate = getPastDate(Timeframe.Last7Days);
    const pastDateValue = "20191225T000000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
  it("Should return 1 day prior", async () => {
    const pastDate = getPastDate(Timeframe.LastDay);
    const pastDateValue = "20191231T000000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
});
