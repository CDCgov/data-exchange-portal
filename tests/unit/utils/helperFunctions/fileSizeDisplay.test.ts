import { describe, it, expect } from "vitest";
import { fileSizeDisplay } from "src/utils/helperFunctions/fileSizeDisplay";

describe("fileSizeDisplay", () => {
  it("should display size in KB for bytes less than a million", () => {
    expect(fileSizeDisplay(500)).toBe("0 KB");
    expect(fileSizeDisplay(1023)).toBe("1 KB");
    expect(fileSizeDisplay(123456)).toBe("121 KB");
    expect(fileSizeDisplay(999999)).toBe("977 KB");
  });

  it("should display size in MB for bytes less than a billion but at least a million", () => {
    expect(fileSizeDisplay(1_000_000)).toBe("0.95 MB");
    expect(fileSizeDisplay(1_234_567)).toBe("1.18 MB");
    expect(fileSizeDisplay(123_456_789)).toBe("117.74 MB");
    expect(fileSizeDisplay(999_999_999)).toBe("953.67 MB");
  });

  it("should display size in GB for bytes a billion or more", () => {
    expect(fileSizeDisplay(1_000_000_000)).toBe("0.93 GB");
    expect(fileSizeDisplay(1_234_567_890)).toBe("1.15 GB");
    expect(fileSizeDisplay(12_345_678_901)).toBe("11.50 GB");
    expect(fileSizeDisplay(123_456_789_012)).toBe("114.98 GB");
  });
});
