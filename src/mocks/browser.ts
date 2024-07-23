// src/mocks/browser.js
import { setupWorker } from "msw/browser";
// import { mmsHandlers } from "src/mocks/handlers/mmsHandlers";
import { psApiHandlers } from "src/mocks/handlers/psApiHandlers";

export const worker = setupWorker(...psApiHandlers);
