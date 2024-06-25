import debounce from "src/utils/helperFunctions/debounce";
import { vi } from "vitest";

const FIXED_SYSTEM_TIME = "2020-01-12T00:00:00Z";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
});

test("it properly debounces function", () => {
  const func = vi.fn();
  const debouncedFunction = debounce(func, 100);

  debouncedFunction();
  expect(func).not.toBeCalled();

  vi.advanceTimersByTime(50);
  expect(func).not.toBeCalled();

  vi.advanceTimersByTime(100);
  expect(func).toBeCalled();
  expect(func.mock.calls.length).toBe(1);
});
