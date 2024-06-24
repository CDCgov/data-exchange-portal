import { vi } from "vitest";
import { getPastDate, isValidIsoString } from "src/utils/helperFunctions/date";
import { Timeframe } from "src/types/timeframes";

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2020-01-01"));
});

afterAll(() => {
  vi.useRealTimers();
});

describe("Get Past Date - Timeframes", () => {
  it("Should return 30 days prior", async () => {
    const pastDate = getPastDate(Timeframe.Last30Days);
    const pastDateValue = "2019-12-02T00:00:00.000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
  it("Should return 15 days prior", async () => {
    const pastDate = getPastDate(Timeframe.Last15Days);
    const pastDateValue = "2019-12-17T00:00:00.000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
  it("Should return 7 days prior", async () => {
    const pastDate = getPastDate(Timeframe.Last7Days);
    const pastDateValue = "2019-12-25T00:00:00.000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
  it("Should return 1 day prior", async () => {
    const pastDate = getPastDate(Timeframe.LastDay);
    const pastDateValue = "2019-12-31T00:00:00.000Z";
    expect(pastDate).toStrictEqual(pastDateValue);
  });
});

describe("isValidIsoString", () => {
  it("should return true for a valid ISO string", () => {
    const validISODate = "2023-06-24T10:30:00Z";
    expect(isValidIsoString(validISODate)).toBe(true);
  });

  it("should return false for an invalid ISO string", () => {
    const invalidISODate = "2023-13-40T10:30:00Z";
    expect(isValidIsoString(invalidISODate)).toBe(false);
  });

  it("should return false for an empty string", () => {
    const emptyString = "";
    expect(isValidIsoString(emptyString)).toBe(false);
  });

  it("should return false for a null value", () => {
    const nullValue = null as unknown as string;
    expect(isValidIsoString(nullValue)).toBe(false);
  });

  it("should return false for a non-ISO date string", () => {
    const nonISODateString = "June 24, 2023";
    expect(isValidIsoString(nonISODateString)).toBe(false);
  });
});
