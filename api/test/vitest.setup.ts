import { server } from "./mocks/node";
import { beforeAll, afterEach, afterAll } from "vitest";
import config from "../local.settings.json";

process.env = Object.assign(process.env, { ...config.Values });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
