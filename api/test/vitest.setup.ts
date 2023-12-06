import { server } from "./mocks/node";
import { beforeAll, afterEach, afterAll } from "vitest";
import config from "./test.settings.json";

process.env = Object.assign(process.env, { ...config });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
