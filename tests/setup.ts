import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { server } from "src/mocks/server";
import { vi } from "vitest";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

beforeEach(() => {
  vi.mock("react-oidc-context", () => ({
    useAuth: vi.fn(),
    hasAuthParams: vi.fn(),
  }));
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
