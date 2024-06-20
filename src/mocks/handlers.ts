import { bypassedHandlers } from "src/mocks/handlers/bypass";
import { mmsHandlers } from "src/mocks/handlers/mmsHandlers";
import { psApiHandlers } from "src/mocks/handlers/psApiHandlers";

export const handlers = [...bypassedHandlers, ...mmsHandlers, ...psApiHandlers];
